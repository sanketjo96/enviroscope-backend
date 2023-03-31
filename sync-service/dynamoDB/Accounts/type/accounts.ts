import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { Account } from "../../../types/accounts"

export type CreateAccountBody = Omit<Account, 'id'>[]
export interface IAccountDBController {
    createAccounts: (
        accountList: CreateAccountBody[], 
        document?: DynamoDBDocument, 
        tableName?: string
    ) => Promise<{
        accountsCreatedCount: number
    }>
}