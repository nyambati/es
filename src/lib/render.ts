import * as Table from 'cli-table2'

class Render {
  constructor(readonly data: any, readonly cli: any) {}

  hasNoData() {
    if (!this.data && !(this.data instanceof Object)) return false
    if (this.data.hits.length > 0) return false
    this.cli.log()
    this.cli.log('No results to display')
    this.cli.log()
    return true
  }

  display() {
    if (this.hasNoData()) return

    const results = this.data.hits
    const head = ['(Index)', ...Object.keys(results[0]._source)]
    const table: Table.Table = new Table({head})

    results.forEach((result: any, index: number) =>
      table.push([Number(index) + 1, ...Object.values(result._source)])
    )

    this.cli.log(table.toString())
    this.cli.log()
    this.cli.log('TOTAL RESULTS FOUND:', this.data.total)
    this.cli.log()
  }
}

export default Render
