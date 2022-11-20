import { client, indexName as index } from "./config";

export class Search {

  /**
 * Finding matches sorted by relevance (full-text query)
 */
  static async match(field: any, query: any) {
    const body = {
      query: {
        match: {
          [field]: {
            query,
          },
        },
      },
    };

    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Matching a phrase (full-text query)
   */
  static async phrase(field: any, query: any, slop: any) {
    const body = {
      query: {
        match_phrase: {
          [field]: {
            query,
            slop
          },
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {

      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          // console.log(hits.map((hit: { _source: { title: any; }; }) => hit._source.title));
        }
      });
    });
  };

  /**
   * Using special operators within a query string and a size parameter (full-text query)
   * search queryString title '+(dessert | cake) -garlic  (mango | caramel | cinnamon)'
   * search queryString title '+(salad | soup) -broccoli  (tomato | apple)'
   */
  static async queryString(field: any, query: any) {
    let body : any;
    if (!field) {
      body = {
        query: {
          query_string: {
            "query": query,
          },
        }
      };
    } else {
      body = {
        query: {
          query_string: {
            default_field: field,
            query,
          },
        }
      };
    }

    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  /**
   * Searching for exact matches of a value in a field (term-level query)
   * search term sodium 0
   */
  static async term(field: any, value: any) {
    const body = {
      query: {
        term: {
          [field]: value,
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  /**
   * Searching for a range of values in a field (term-level query)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt (less than)
   * lte (less than or equal to)
   * run-func search range sodium 0 100
   */
  static async range(field: any, gte: any, lte: any) {
    const body = {
      query: {
        range: {
          [field]: {
            gte,
            lte,
          },
        },
      },
    };
    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };


  /**
   * Combining several queries together (boolean query)
   * search boolean
   */
  static async boolean() {
    const body = {
      query: {
        bool: {
          filter: [{ range: { rating: { gte: 4 } } }],
          must: [
            { match: { categories: "Quick & Easy" } },
            { match: { title: "beer" } },
          ],
          should: [
            { match: { categories: "Cocktails" } },
          ],
          must_not: { match: { ingredients: "garlic" } }
        },
      },
    };

    let awsClient = await client();

    return new Promise<any>((resolve, reject) => {
      awsClient.search({ index, body }, (error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

}



