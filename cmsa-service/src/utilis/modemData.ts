import userList from '../mock/modemUserMap.json';
import { AccountModemMap } from 'src/types/AccountModemMap';

export const getMockModemData = (id: string) => {
  const user = userList.find((item: AccountModemMap) => item.accountId === id)
  return user;
}