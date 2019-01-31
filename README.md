# es

Elasticsearch Explorer

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/es.svg)](https://npmjs.org/package/es)
[![Downloads/week](https://img.shields.io/npm/dw/es.svg)](https://npmjs.org/package/es)
[![License](https://img.shields.io/npm/l/es.svg)](https://github.com/nyambati/es/blob/master/package.json)

<!-- toc -->

- [es](#es)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g es
$ es COMMAND
running command...
$ es (-v|--version|version)
es/0.0.0 darwin-x64 node-v10.15.1
$ es --help [COMMAND]
USAGE
  $ es COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [es](#es)
- [Usage](#usage)
- [Commands](#commands)
  - [`es config:get`](#es-configget)
  - [`es config:set`](#es-configset)
  - [`es help [COMMAND]`](#es-help-command)
  - [`es index:delete`](#es-indexdelete)
  - [`es index:list`](#es-indexlist)
  - [`es ingest`](#es-ingest)
  - [`es search INDEX QUERY`](#es-search-index-query)
  - [Installation](#installation)

## `es config:get`

Show all the CLI config

```
USAGE
  $ es config:get
```

_See code: [src/commands/config/get.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/config/get.ts)_

## `es config:set`

Set CLI configuration

```
USAGE
  $ es config:set

OPTIONS
  -u, --uri=uri  (required) Elasticsearch Host URI
```

_See code: [src/commands/config/set.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/config/set.ts)_

## `es help [COMMAND]`

display help for es

```
USAGE
  $ es help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `es index:delete`

Delete specified index

```
USAGE
  $ es index:delete

OPTIONS
  -i, --index=index  (required) Elasticsearch index
```

_See code: [src/commands/index/delete.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/index/delete.ts)_

## `es index:list`

List all indices in the Cluster

```
USAGE
  $ es index:list
```

_See code: [src/commands/index/list.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/index/list.ts)_

## `es ingest`

Ingest data into the cluster

```
USAGE
  $ es ingest

OPTIONS
  -i, --index=index  (required) Elasticsearch Index
  -s, --src=src      (required) Location of data json file
  -t, --type=type    (required) Elasticsearch Type
```

_See code: [src/commands/ingest.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/ingest.ts)_

## `es search INDEX QUERY`

Search documents

```
USAGE
  $ es search INDEX QUERY

ARGUMENTS
  INDEX  Elasticsearch Index to search against
  QUERY  Search query to execute

OPTIONS
  -c, --count=count    Number of results to return
  -f, --fuzzy          Enable Fuzziness
  -o, --offset=offset  Search results offset
  -s, --sort=sort      Sort
  -t, --type=type      Elasticsearch Type
```

_See code: [src/commands/search.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/search.ts)_

<!-- commandsstop -->

## Installation

This CLI has not been published to NPM registry. However you can install it in the following two ways

1. *Link* - You can install this packge by using `npm link` command. This enable you to make changes to the code while using the CLI.
   ```bash
   $ npm link
   ```
   After this you should be able to access the functionality by running `es [command]`. Run npm unlink to unlink the binaries.
2. *Package* - This option enable you to package the cli into a tarball which can be installed with `npm -g install <tarball>`.
   ```bash
   $ npm pack
   $ npm install <location of tarbal file>
   ```
