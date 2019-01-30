import { Command, flags } from "@oclif/command";
import * as fs from "fs";
import * as path from "path";

export default class ConfigGet extends Command {
  static description = "Return All set config";

  async run() {
    const config = require(path.join(this.config.configDir, "config.json"));
    console.table(
      Object.keys(config).map(key => ({ Key: key, Value: config[key] }))
    );
  }
}
