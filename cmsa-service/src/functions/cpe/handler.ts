import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getMockModemData } from 'src/utilis/modemData';
import { getRandomizeCpeData } from 'src/utilis/mutateRes';

const cpe = async (event) => {
  const { accountId } = event?.pathParameters ?? undefined;
  const userModemMapData = getMockModemData(accountId)
  return formatJSONResponse({
    ...getRandomizeCpeData(userModemMapData)
  });
};

export const main = middyfy(cpe);
