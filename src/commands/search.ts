import { Command, flags } from "@oclif/command";
import Search from "../lib/search";
import client from "../lib/client";

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

  async run() {
    const { args, flags } = this.parse(SearchCommand);
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
