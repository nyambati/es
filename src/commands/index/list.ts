import { Command, flags } from "@oclif/command";
import * as path from "path";
import Client from "../../lib/client";

export default class IndexList extends Command {
  static description = "List all indices in the Cluster";

  async run() {
    const config = require(path.join(this.config.configDir, "config.json"));
    const client = await new Client(config.url).client();

    try {
      const response = await client.indices.getAlias({ index: "_all" });
      console.table(
        Object.keys(response).filter(index => !index.startsWith("."))
      );
    } catch (error) {
      this.log(error.message);
      this.exit();
    }
  }
}
