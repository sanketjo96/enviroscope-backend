import { AccountModemMap } from 'src/types/AccountModemMap';
import cpeData from '../mock/cpe.json';
import deviceData from '../mock/device.json';
import { ConnectionState, CpeRes } from 'src/types/cpe';
import { DeviceRes } from 'src/types/device';

export const getRandomizeCpeData = (userModemMap: AccountModemMap) => {
  const actualModemId = userModemMap.modemId;

  const mockModemId = (cpeData as CpeRes)['active-modem'];
  const mockModemDetails = cpeData.cpe.find(item => item.id === mockModemId)
  const isAvailable = Math.random() > 0.2 ? true : false;

  return {
    cpe: [
      ...cpeData.cpe.filter(item => item.id !== mockModemId),
      {
        ...mockModemDetails,
        id: actualModemId,
        "connection-state": isAvailable ? ConnectionState.connected : ConnectionState.disconnected
      }
    ],
    "active-modem": actualModemId
  }
}

export const getRandomizeDeviceData = (userModemMap: AccountModemMap) => {
  const actualModemId = userModemMap.modemId;

  const mockDeviceDetails = (deviceData as DeviceRes).device[0]
  const isAvailable = Math.random() > 0.2 ? true : false;

  return {
    device: [
      ...deviceData.device.filter((item, index) => index !== 0),
      {
        ...mockDeviceDetails,
        "cpe-ref": actualModemId,
        "connection-state": isAvailable ? ConnectionState.connected : ConnectionState.disconnected
      }
    ],
    "active-modem": actualModemId
  }
}