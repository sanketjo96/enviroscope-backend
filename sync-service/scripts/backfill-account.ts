// const fs = require('fs')
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { CreateAccountBody } from '../dynamoDB/Accounts/type/accounts';
import { accountsDbDynamoAdapter } from '../dynamoDB/Accounts/utils/account.adpt';

const client = new DynamoDBClient({ region: 'us-east-1' });
const dbClient = DynamoDBDocument.from(client);

const parseCSVdata = (): Promise<CreateAccountBody[]> => {
    return new Promise((resolve, reject) => {
        const results: CreateAccountBody[] = [];
        fs.createReadStream(path.resolve('scripts', 'accounts.csv'))
            .pipe(csvParser())
            .on('data', (data: CreateAccountBody) => results.push(data))
            .on('error', (error) => {
                console.error(`Parsing error for product import CSV data: `, error);
                reject(new Error(`Parsing error for product import CSV data: `));
              })
            .on('end', () => {
                resolve(results)
            });
    });

}

export const backFillAccountTableFromCSV = async () => {
    try {
        const data: CreateAccountBody[] = await parseCSVdata();
        const result = await accountsDbDynamoAdapter.createAccounts(data, dbClient, 'ACCOUNTS')
        console.log(result)
    } catch(e) {
        console.log('something went wrong during update:', e)
    }

}

backFillAccountTableFromCSV();