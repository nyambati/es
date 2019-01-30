es
==

Elasticsearch Explorer

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/es.svg)](https://npmjs.org/package/es)
[![Downloads/week](https://img.shields.io/npm/dw/es.svg)](https://npmjs.org/package/es)
[![License](https://img.shields.io/npm/l/es.svg)](https://github.com/nyambati/es/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g es
$ es COMMAND
running command...
$ es (-v|--version|version)
es/0.0.0 darwin-x64 node-v8.9.3
$ es --help [COMMAND]
USAGE
  $ es COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`es config [FILE]`](#es-config-file)
* [`es help [COMMAND]`](#es-help-command)
* [`es ingest`](#es-ingest)
* [`es search INDEX QUERY`](#es-search-index-query)

## `es config [FILE]`

describe the command here

```
USAGE
  $ es config [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/config.ts](https://github.com/nyambati/es/blob/v0.0.0/src/commands/config.ts)_

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

describe the command here

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
