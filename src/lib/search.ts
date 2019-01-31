import chalk from 'chalk'

import Render from './render'
import {SearchArgs} from './types'

class Search {
  constructor(readonly args: SearchArgs, readonly cli: any) {}
  async hasNoIndex(index: string) {
    const {client} = this.args
    if (await client.indices.exists({index})) return
    this.cli.error(`Specified index ${chalk.red(index)} does not exist`)
  }

  parseSearchQuery(query: string) {
    const array = query.split(':')
    const term = array.splice(-1)[0]
    return {
      fields: array.length <= 0 ? undefined : array,
      term
    }
  }

  async find() {
    let {index, query, client, offset, size, fuzziness, type, sort} = this.args

    await this.hasNoIndex(index)

    const {fields, term} = this.parseSearchQuery(query)
    fuzziness = fuzziness ? 2 : undefined

    try {
      const response = await client.search({
        index,
        sort,
        explain: false,
        ignoreUnavailable: true,
        body: {
          from: offset,
          type,
          size,
          query: {
            multi_match: {
              query: `${term}`,
              fuzziness,
              operator: 'and',
              fields,
              type: 'most_fields'
            }
          }
        }
      })
      return new Render(response.hits, this.cli).display()
    } catch (error) {
      this.cli.error(error.message)
    }
  }
}

export default Search
