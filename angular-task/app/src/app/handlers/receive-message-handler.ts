import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WebSocketMessage, WebSocketMessageHandler } from '@services/websocket/websocket-message.interface';
import { WebSocketMessageTypes } from '@services/websocket/websocket-message-types';
import { WebSocketHandlerRegistry } from '@services/websocket/websocket-handler-registry.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiveMessageHandler implements WebSocketMessageHandler<string> {
  public messageType: string = WebSocketMessageTypes.RECEIVE_MESSAGE;

  constructor(
    private _snackBar: MatSnackBar,
    private _handlerRegistry: WebSocketHandlerRegistry
  ) {
    this._handlerRegistry.registerHandler(this);
  }

  public handle(message: WebSocketMessage<string>): void {
    if (message.payload) {
      this._snackBar.open(new Date(Number(message.payload)).toLocaleString(), '', {
        duration: 2000
      });
    }
  }
}
