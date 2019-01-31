import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import isURL from 'validator/lib/isURL'

export default class ConfigSet extends Command {
  static description = 'Set CLI configuration'

  static flags = {
    uri: flags.string({
      char: 'u',
      description: 'Elasticsearch Host URI',
      required: true
    })
  }

  async run() {
    const {flags} = this.parse(ConfigSet)
    if (!fs.existsSync(this.config.configDir)) {
      fs.mkdirSync(this.config.configDir)
    }

    const file = path.join(this.config.configDir, 'config.json')

    if (!isURL(flags.uri, {require_protocol: true, require_tld: false})) {
      this.log('URL specified is invalid, example http://localhost:9200')
      this.exit(1)
    }

    try {
      await fs.writeFile(file, JSON.stringify({url: flags.uri}))
    } catch (error) {
      this.log(error.message)
      process.exit()
    }

    const config = await fs.readJSON(file)

    this.log(`Elasticsearch host has been set to ${config.url}`)
  }
}
