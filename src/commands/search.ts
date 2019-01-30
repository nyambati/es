import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import Search from '../lib/search'
import {client, ping} from '../lib/client'

export default class SearchCommand extends Command {
  static description = 'Search documents'

  static flags = {
    offset: flags.integer({
      char: 'o',
      description: 'Search results offset'
    }),
    type: flags.string({
      char: 't',
      description: 'Elasticsearch Type'
    }),
    count: flags.integer({
      char: 'c',
      description: 'Number of results to return'
    }),
    fuzzy: flags.boolean({
      char: 'f',
      description: 'Enable Fuzziness',
      default: false
    }),
    sort: flags.string({
      char: 's',
      description: 'Sort'
    })
  }

  static args = [
    {
      name: 'index',
      required: true,
      description: 'Elasticsearch Index to search against'
    },
    {
      name: 'query',
      required: true,
      description: 'Search query to execute'
    }
  ]

  get uri() {
    return require(path.join(this.config.configDir, 'config.json')).url
  }

  async run() {
    const {args, flags} = this.parse(SearchCommand)

    // Ensure we have a working conncetion
    await ping(this.uri, this)

    const search = new Search({
      client: client(this.uri),
      fuzziness: flags.fuzzy,
      size: flags.count,
      ...args,
      ...flags
    })
    await search.find()
  }
}
