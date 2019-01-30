import { Command, flags } from "@oclif/command";
import * as fs from "fs-extra";
import * as path from "path";
import Search from "../lib/search";
import Client from "../lib/client";

export default class SearchCommand extends Command {
  static description = "describe the command here";

  static flags = {
    offset: flags.integer({
      char: "o",
      description: "Search results offset"
    }),
    type: flags.string({
      char: "t",
      description: "Elasticsearch Type"
    }),
    count: flags.integer({
      char: "c",
      description: "Number of results to return"
    }),
    fuzzy: flags.boolean({
      char: "f",
      description: "Enable Fuzziness",
      default: false
    }),
    sort: flags.string({
      char: "s",
      description: "Sort"
    })
  };

  static args = [
    {
      name: "index",
      required: true,
      description: "Elasticsearch Index to search against"
    },
    {
      name: "query",
      required: true,
      description: "Search query to execute"
    }
  ];

  async uri() {
    const file = path.join(this.config.configDir, "config.json");
    const response = await fs.readJSON(file);
    return response.url;
  }

  async run() {
    const { args, flags } = this.parse(SearchCommand);
    const client = new Client(await this.uri()).client;
    const search = new Search({
      client,
      fuzziness: flags.fuzzy,
      size: flags.count,
      ...args,
      ...flags
    });
    search.find();
  }
}
