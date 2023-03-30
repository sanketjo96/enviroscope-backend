import type { AWS } from '@serverless/typescript';

import getBookings from '@functions/getBookings';
import setBooking from '@functions/setBooking';
import resetBookings from '@functions/resetBookings';

const serverlessConfiguration: AWS = {
  service: 'booking-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      DYNAMO_ACCOUNTS_TABLE: 'ACCOUNTS',
      DYNAMO_CPE_BOOKINGS_TABLE: 'CPE_BOOKINGS',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
        ],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { getBookings, setBooking, resetBookings },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
