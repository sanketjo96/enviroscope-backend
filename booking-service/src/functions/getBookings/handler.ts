import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const { WORK_REGION, DYNAMO_ACCOUNTS_TABLE } = process.env;

/**
 * This should return all data from CPE_BOOKING table
 * @param event 
 * @returns 
 */
const getBookings = async (event) => {
  const client = new DynamoDBClient({ region: WORK_REGION });
  const dbClient = DynamoDBDocument.from(client);
  const { Items: accounts = [] } = await dbClient.send(
    new ScanCommand({
      TableName: DYNAMO_ACCOUNTS_TABLE || '',
    })
  );

  return formatJSONResponse({
    message: `Hello from get bookings API! ${accounts.length}`,
    event,
  });
};

export const main = middyfy(getBookings);
