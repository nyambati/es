import {Command, flags} from '@oclif/command'
import * as Progress from 'ascii-progress'
import * as fs from 'fs-extra'
import * as path from 'path'

import Ingester from '../lib/ingester'
import {client, ping} from '../lib/client'

export default class Ingest extends Command {
  static description = 'Ingest data into the cluster'

  static flags = {
    index: flags.string({
      char: 'i',
      description: 'Elasticsearch Index',
      required: true,
      dependsOn: ['type', 'src']
    }),
    type: flags.string({
      char: 't',
      description: 'Elasticsearch Type',
      required: true,
      dependsOn: ['index', 'src']
    }),
    src: flags.string({
      char: 's',
      description: 'Location of data json file',
      required: true,
      dependsOn: ['type', 'index']
    })
  }

  loadData(src: string) {
    if (!fs.existsSync(src)) {
      console.log("Specified file doesn't exist")
      process.exit()
    }

    return require(path.resolve(src))
  }

  get uri() {
    return require(path.join(this.config.configDir, 'config.json')).url
  }

  async run() {
    const {flags} = this.parse(Ingest)
    const {index, type, src} = flags
    const data = this.loadData(src)

    // ensure there is a viable connection
    await ping(this.uri, this)

    const ingestArgs = {
      client: client(await this.uri),
      index,
      type,
      data
    }

    const ingester = new Ingester(ingestArgs, this)

    const progress = new Progress({
      schema: '[:bar.white] :current/:total :percent',
      total: data.length
    })

    const ingestStream = await ingester.start()

    ingestStream.subscribe({
      next: () => progress.tick(),
      complete: () => {
        progress.clear()
        console.log(`${data.length} documents have been successfuly indexed`)
      },
      error: (error: Error) => console.log(error.message)
    })
  }
}
