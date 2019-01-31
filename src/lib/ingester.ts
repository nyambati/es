import {from} from 'rxjs'
import {concatMap, delay} from 'rxjs/operators'
import chalk from 'chalk'

import {IngestArgs} from './types'

class Ingester {
  constructor(readonly args: IngestArgs, readonly cli: any) {}

  async createAndResetIndex() {
    const {client, index} = this.args
    if (await client.indices.exists({index})) {
      this.cli.log()
      this.cli.log(
        chalk.yellowBright(`Index ${index} already exist resetting...`)
      )
      try {
        const deleted = await client.indices.delete({index})
        if (!deleted.acknowledged) {
          this.cli.error(`Failed to reset ${index} index`)
        }
        this.cli.log(chalk.greenBright('Index has been reset successfully'))
      } catch (error) {
        this.cli.error(error.message)
      }
    }

    // Create the index with given index name
    try {
      await client.indices.create({index})
      this.cli.log(
        chalk.greenBright(`Index ${index} has been successfully created`)
      )
    } catch (err) {
      this.cli.error(err)
    }
  }

  async start() {
    const {data, client, type, index} = this.args
    await this.createAndResetIndex()
    return from(data).pipe(
      delay(100),
      concatMap(body => client.index({index, type, body}))
    )
  }
}

export default Ingester
