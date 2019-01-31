import {Client} from 'elasticsearch'

export type IngestArgs = {
  client: Client
  index: string
  type: string
  data: any
}

export type SearchArgs = {
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
