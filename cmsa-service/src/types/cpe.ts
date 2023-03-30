export enum ConnectionState {
  connected = "connected",
  disconnected = "disconnected"
}

export interface CpeRes {
  cpe: Array<{
    id: string;
    "connection-state": ConnectionState,
  }>,
  'active-modem': string;
}