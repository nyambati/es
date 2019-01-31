import {Command, flags} from '@oclif/command'
import * as Progress from 'ascii-progress'
import * as fs from 'fs-extra'
import * as path from 'path'
import chalk from 'chalk'
import {isURL} from 'validator'
import axios, {AxiosResponse} from 'axios'

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

  async loadData(source: string) {
    const isSourceAFile = isURL(source, {
      require_protocol: true,
      require_tld: false
    })

    switch (isSourceAFile) {
      case false:
        this.log(chalk.blueBright(`Indexing data from a file ${source}`))
        if (!fs.existsSync(source)) {
          this.error("Specified file doesn't exist")
        }
        return require(path.resolve(source))
      default:
        this.log()
        this.log(chalk.blueBright(`Indexing data from url: ${source}`))
        this.log()
        try {
          const response: AxiosResponse = await axios.get(source)
          return response.data
        } catch (error) {
          this.error(error.message)
        }
    }
  }

  get uri() {
    return require(path.join(this.config.configDir, 'config.json')).url
  }

  async run() {
    const {flags} = this.parse(Ingest)
    const {index, type, src} = flags
    const data = await this.loadData(src)

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
        this.log(
          chalk.greenBright(
            `${data.length} documents have been successfuly indexed`
          )
        )
        this.log()
      },
      error: (error: Error) => this.error(error.message)
    })
  }
}
