import { client, indexName as index, indexName } from "./config";
import { Helper } from "./helpers";

export class Index {

  /**
   * Getting list of indices
   */
  static async getIndices() {
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.cat.indices({ format: "json" }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  /**
   * Retrieving mapping for the index.
   */
  static async getMapping() {
    console.log(`Retrieving mapping for the index with name ${indexName}`);

    let awsClient = await client();
    awsClient.indices.getMapping({ index: indexName }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result.body.recipes.mappings.properties);
      }
    });
  };

  /**
   * Deleting the index
   */
  static async delete(index: any) {

    let awsClient = await client();

    awsClient.indices.delete(
      {
        index: index || indexName,
      },
      Helper.logBody
    );
  };
}
