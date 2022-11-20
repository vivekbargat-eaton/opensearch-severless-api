import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Search } from './../../search'

export const handler = async (_event: APIGatewayProxyEvent, context): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = true;

  let response: APIGatewayProxyResult = {
    statusCode: 200,
    body: ''
  };

  try {

    const field = _event && _event.queryStringParameters && _event.queryStringParameters['field'] || null;
    const query = _event && _event.queryStringParameters && _event.queryStringParameters['query'] || null;

    const elasticResponse = await Search.queryString(field, query);
    response.statusCode = elasticResponse.statusCode;
    response.body = JSON.stringify(elasticResponse.body);

  } catch (err: any) {
    console.log(err);
    response.statusCode = err.statusCode;
    response.body = JSON.stringify(err.body);
  }
  return response;
};



