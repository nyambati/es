import {Command, flags} from '@oclif/command'
import * as path from 'path'
import chalk from 'chalk'

import {client as _client, ping} from '../../lib/client'

export default class IndexDelete extends Command {
  static description = 'Delete specified index'

  static flags = {
    index: flags.string({
      char: 'i',
      required: true,
      description: 'Elasticsearch index'
    })
  }

  async run() {
    const {flags} = this.parse(IndexDelete)
    const config = require(path.join(this.config.configDir, 'config.json'))

    await ping(config.url, this)

    const client = _client(config.url)

    if (!(await client.indices.exists({index: flags.index}))) {
      this.log()
      this.error(`Specified index ${flags.index} doesn't exist in this cluster`)
    }

    try {
      const response = await client.indices.delete({index: flags.index})
      if (response.acknowledged) {
        this.log()
        this.log(
          chalk.green(`Index ${flags.index} has been deleted successfully`)
        )
        this.log()
      }
    } catch (error) {
      this.error(error.message)
    }
  }
}
