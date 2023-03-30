import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

/**
 * This should read accountId from path and user and isBooked from 
 * request body and perform update on CPE_BOOKING 
 * @param event 
 * @returns 
 */
const setBooking: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const {user, isBooked} = event.body;
  const { accountId } = event?.pathParameters ?? undefined;
  return formatJSONResponse({
    message: `Hello from set bookings API! ${accountId} ${user} ${isBooked}`,
    event,
  });
};

export const main = middyfy(setBooking);
