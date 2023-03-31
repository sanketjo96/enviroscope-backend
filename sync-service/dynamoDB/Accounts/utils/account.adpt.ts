import { v4 as uuidV4 } from 'uuid';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TransactWriteCommand } from "@aws-sdk/lib-dynamodb";

import { CreateAccountBody, IAccountDBController } from "../type/accounts";

const { WORK_REGION, DYNAMO_ACCOUNTS_TABLE } = process.env;
const client = new DynamoDBClient({ region: WORK_REGION });
const dbClientDocument = DynamoDBDocument.from(client);

export const accountsDbDynamoAdapter: IAccountDBController = {
    async createAccounts(accountList: CreateAccountBody[], document?: DynamoDBDocument, tableName?: string) {
        const dbDocumentToUse = document ? document : dbClientDocument;
        const tableToUse = tableName ? tableName : DYNAMO_ACCOUNTS_TABLE;

        const accountItems = accountList.map(item => ({
            Put: {
                TableName: tableToUse || '',
                Item: {
                    id: uuidV4(),
                    ...item,
                }
            }
        }));

        try {
            await dbDocumentToUse.send(
                new TransactWriteCommand({
                    TransactItems: accountItems
                })
            );
            return {
                accountsCreatedCount: accountItems?.length ?? 0,
            };
        } catch (e) {
            throw new Error(e)
        }
    }
}