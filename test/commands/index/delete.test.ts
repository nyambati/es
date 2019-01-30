import {expect, test} from '@oclif/test'

describe('index:delete', () => {
  test
    .stdout()
    .command(['index:delete'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['index:delete', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
