import {Command} from '@oclif/command'
import * as path from 'path'
import ux from 'cli-ux'

export default class ConfigGet extends Command {
  static description = 'Show all the CLI config'

  async run() {
    const config = require(path.join(this.config.configDir, 'config.json'))

    const data = Object.keys(config).map(key => ({
      Key: key,
      Value: config[key]
    }))

    this.log()
    ux.table(data, {Key: {}, Value: {}})
    this.log()
    this.log(`TOTAL RESULTS FOUND: ${data.length}`)
    this.log()
  }
}
