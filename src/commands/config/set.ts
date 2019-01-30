import { Command, flags } from "@oclif/command";
import * as fs from "fs-extra";
import * as path from "path";

export default class ConfigSet extends Command {
  static description = "Set CLI configuration";

  static flags = {
    uri: flags.string({ char: "h" })
  };
  async run() {
    const { args, flags } = this.parse(ConfigSet);
    if (!fs.existsSync(this.config.configDir)) {
      fs.mkdirSync(this.config.configDir);
    }

    const file = path.join(this.config.configDir, "config.json");

    try {
      await fs.writeFile(file, JSON.stringify({ url: flags.uri }));
    } catch (error) {
      this.log(error.message);
      process.exit();
    }

    const config = await fs.readJSON(file);

    this.log(`Elasticsearch host has been set to ${config.url}`);
  }
}
