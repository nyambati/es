import { Client } from "elasticsearch";

class EsClient {
  public client: Client;
  private host: string;

  constructor() {
    this.host = process.env.ES_HOST || "localhost:9200";
    this.ensureHostConnection();
    this.client = new Client({ host: this.host });
  }

  async ensureHostConnection() {
    if (!this.host) {
      console.log("Elasticsearch host has not been set");
      process.exit(1);
    }
  }
}

export default EsClient;
