import { Client } from "elasticsearch";

class EsClient {
  constructor(private uri: string) {}

  get client() {
    return new Client({ host: this.uri });
  }

  async ensureHostConnection() {
    if (!this.uri) {
      console.log("Elasticsearch host has not been set");
      process.exit(1);
    }
  }
}

export default EsClient;
