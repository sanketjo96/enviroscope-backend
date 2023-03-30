import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

/**
 * This should work as master reset for booked modems. Once trigger
 * it should removed booked status from all modems from CPE_BOOKING 
 * table
 * @param event 
 * @returns 
 */
const resetBookings: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello from re-set bookings API!`,
    event,
  });
};

export const main = middyfy(resetBookings);
