import { ConnectionState } from "./cpe";

export interface DeviceRes {
  device: Array<{
    id: string;
    'cpe-ref': string;
    "connection-state": ConnectionState,
  }>,
}