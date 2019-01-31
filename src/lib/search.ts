import {Client} from 'elasticsearch'
import Render from './render'

type SearchArgs = {
  index: string
  query: string
  client: Client
  fields?: Array<string>
  offset?: number
  size?: number
  type?: string
  sort?: string
  fuzziness?: any
}

class Search {
  constructor(readonly args: SearchArgs, readonly cli: any) {}
  async hasNoIndex(index: string) {
    const {client} = this.args
    if (!(await client.indices.exists({index}))) {
      this.cli.log(`Specified index ${index} does not exist`)
      return true
    }
    return false
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

    if (await this.hasNoIndex(index)) return

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
      return
    }
  }
}

export default Search
