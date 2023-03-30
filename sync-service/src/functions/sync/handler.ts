import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/client-dynamodb/dist-types/commands';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { AppTables } from 'src/constants/tables';

import schema from './schema';

const { WORK_REGION } = process.env;

/**
 * This will hit cpe and device requests for all existing records from ACCOUNTS 
 * table and create corresponding record in CPE_BOOKING
 * @param event 
 * @returns 
 */
const sync: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const client = new DynamoDBClient({ region: WORK_REGION });
  const dbClient = DynamoDBDocument.from(client);
  const { Items: accounts = [] } = await dbClient.send(
    new ScanCommand({
      TableName: AppTables.DYNAMO_ACCOUNTS_TABLE || '',
    })
  );

  return formatJSONResponse({
    message: `Hello from sync service ${accounts.length}`,
    event,
  });
};

export const main = middyfy(sync);
