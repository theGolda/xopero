import { WebSocketMessageTypes } from '@services/websocket/websocket-message-types';
import { WebSocketMessage } from '@services/websocket/websocket-message.interface';

export class WebSocketMessageFactory {
  static createSynchronizeUserMessage(userId: number): WebSocketMessage<number> {
    return {
      type: WebSocketMessageTypes.SYNCHRONIZE_USER,
      payload: userId
    };
  }
}
