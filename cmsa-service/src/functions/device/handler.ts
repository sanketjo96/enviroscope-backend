import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getMockModemData } from 'src/utilis/modemData';
import { getRandomizeDeviceData } from 'src/utilis/mutateRes';

const device = async (event) => {
  const { accountId } = event?.pathParameters ?? undefined;
  const userModemMapData = getMockModemData(accountId)
  return formatJSONResponse({
    ...getRandomizeDeviceData(userModemMapData)
  });
};

export const main = middyfy(device);
