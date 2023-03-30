import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

/**
 * This should return all data from CPE_BOOKING table
 * @param event 
 * @returns 
 */
const getBookings: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello from get bookings API!`,
    event,
  });
};

export const main = middyfy(getBookings);
