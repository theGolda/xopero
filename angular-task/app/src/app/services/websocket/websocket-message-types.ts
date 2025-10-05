export const WebSocketMessageTypes = {
  SYNCHRONIZE_USER: 'SynchronizeUser',
  RECEIVE_MESSAGE: 'ReceiveMessage',
  SYNCHRONIZE_USER_FINISHED: 'SynchronizeUserFinished'
} as const;

export type WebSocketMessageType = typeof WebSocketMessageTypes[keyof typeof WebSocketMessageTypes];
