import { Command, flags } from "@oclif/command";
import Search from "../lib/search";
import EsClient from "../lib/client";

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
    })
  };

  static args = [{ name: "index" }, { name: "query" }];

  async run() {
    const { args, flags } = this.parse(SearchCommand);
    const client = new EsClient().client;
    const search = new Search({
      client,
      fuzziness: flags.fuzzy,
      ...args,
      ...flags
    });
    search.find();
  }
}
