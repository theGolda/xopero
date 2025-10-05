export interface WebSocketMessage<T = any> {
  type: string;
  payload: T;
}

export interface WebSocketMessageHandler<T = any> {
  handle(message: WebSocketMessage<T>): void;
}
