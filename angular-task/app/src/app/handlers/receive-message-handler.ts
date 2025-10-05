import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketMessage, WebSocketMessageHandler } from '@services/websocket/websocket-message.interface';
import { WebSocketMessageTypes } from '@services/websocket/websocket-message-types';

@Injectable({
  providedIn: 'root'
})
export class ReceiveMessageHandler implements WebSocketMessageHandler<string> {
  messageType: string = WebSocketMessageTypes.RECEIVE_MESSAGE;
  componentName: string = 'WebSocketService';

  constructor(private snackBar: MatSnackBar) {}

  handle(message: WebSocketMessage<string>): void {
    if (message.payload) {
      this.snackBar.open(new Date(Number(message.payload)).toLocaleString(), '', {
        duration: 2000
      });
    }
  }
}
