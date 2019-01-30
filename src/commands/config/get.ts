import { Command, flags } from "@oclif/command";
import * as path from "path";

export default class ConfigGet extends Command {
  static description = "Show all the CLI config";

  async run() {
    const config = require(path.join(this.config.configDir, "config.json"));
    console.table(
      Object.keys(config).map(key => ({ Key: key, Value: config[key] }))
    );
  }
}
