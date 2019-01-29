import { Client } from "elasticsearch";
import { from } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

type IngestArgs = {
  client: Client;
  index: string;
  type: string;
  data: any;
};

class Ingester {
  constructor(private args: IngestArgs) {}

  async createAndResetIndex() {
    const { client, index } = this.args;
    if (await client.indices.exists({ index })) {
      console.log(`Index ${index} already exist resetting..`);
      await client.indices.delete({ index });
    }

    // Create the index with given index name
    try {
      await client.indices.create({ index });
      console.log(`Index ${index} has been successfully created`);
    } catch (err) {
      throw err;
    }
  }

  start() {
    const { data, client, type, index } = this.args;
    this.createAndResetIndex();
    return from(data).pipe(
      delay(500),
      concatMap(body => client.index({ index, type, body }))
    );
  }
}

export default Ingester;
