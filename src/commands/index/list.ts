import {Command} from '@oclif/command'
import * as path from 'path'
import ux from 'cli-ux'

import {client as _client, ping} from '../../lib/client'

export default class IndexList extends Command {
  static description = 'List all indices in the Cluster'

  async run() {
    const config = require(path.join(this.config.configDir, 'config.json'))

    await ping(config.url, this)

    const client = _client(config.url)

    try {
      const response = await client.indices.getAlias({index: '_all'})
      const data = Object.keys(response)
        .filter(index => !index.startsWith('.'))
        .map(index => ({index}))
      this.log()
      ux.table(data, {index: {}})
      this.log()
      this.log(`TOTAL RESULTS FOUND: ${data.length}`)
      this.log()
    } catch (error) {
      this.error(error.message)
    }
  }
}
