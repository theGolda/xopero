import { WebSocketMessageTypes } from '@services/websocket/websocket-message-types';
import { WebSocketMessage } from '@services/websocket/websocket-message.interface';

export class WebSocketMessageFactory {
  static createSynchronizeUserMessage(userId: number): WebSocketMessage<number> {
    return {
      type: WebSocketMessageTypes.SYNCHRONIZE_USER,
      payload: userId
    };
  }

  static createReceiveMessageResponse(message: string): WebSocketMessage<string> {
    return {
      type: WebSocketMessageTypes.RECEIVE_MESSAGE,
      payload: message
    };
  }

  static createSynchronizeUserFinishedResponse(userData: any): WebSocketMessage<any> {
    return {
      type: WebSocketMessageTypes.SYNCHRONIZE_USER_FINISHED,
      payload: userData
    };
  }
}
