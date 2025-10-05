export interface WebSocketMessage<T = any> {
  type: string;
  payload: T;
}

export interface WebSocketMessageHandler<T = any> {
  messageType: string;
  handle(message: WebSocketMessage<T>): void;
}
