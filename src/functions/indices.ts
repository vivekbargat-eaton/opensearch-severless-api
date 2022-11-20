import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Index } from './../../index'

export const handler = async (_event: APIGatewayProxyEvent, context): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = true;
  let response: APIGatewayProxyResult = {
    statusCode: 200,
    body: ''
  };

  try {
    const elasticResponse = await Index.getIndices();
    response.statusCode = elasticResponse.statusCode;
    response.body = JSON.stringify(elasticResponse.body);
  
  } catch (err: any) {
    console.log(err);
    response.statusCode = err.statusCode;
    response.body = JSON.stringify(err.body);
  }
  return response;
};



