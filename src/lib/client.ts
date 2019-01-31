import {Client} from 'elasticsearch'
import * as url from 'url'
import * as waitFor from 'wait-port'

export const client = (uri: string) => new Client({host: uri})
export const ping = async (uri: string, cli: any) => {
  const parsed = url.parse(uri)
  const params = {
    host: parsed.hostname,
    port: Number(parsed.port) || (parsed.protocol === 'https' ? 443 : 80),
    timeout: 30000
  }

  try {
    const connected = await waitFor(params)

    if (!connected) {
      cli.error('Failed to establish connection')
    }
  } catch (error) {
    cli.error(error.message)
  }
}
