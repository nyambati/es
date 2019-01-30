import { Client } from "elasticsearch";
import * as wait from "wait-port";
import * as url from "url";

class EsClient {
  constructor(private uri: string) {}

  async client() {
    console.log("Establising connection");
    try {
      const connected = await this.ensureHostConnection();
      if (!connected) {
        console.log(`Failed to establish connection to ${this.uri}`);
      }

      return new Client({ host: this.uri });
    } catch (err) {
      console.log(err.message);
      process.exit(1);
    }
  }

  async ensureHostConnection() {
    const uri = url.parse(this.uri);
    const port = uri.protocol === "https" ? 443 : 80;
    const params = {
      host: uri.hostname,
      port: Number(uri.port) || port,
      timeout: 3000
    };
    return wait(params);
  }
}

export default EsClient;
