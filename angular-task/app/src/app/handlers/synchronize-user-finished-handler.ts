import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { WebSocketMessage, WebSocketMessageHandler } from '@services/websocket/websocket-message.interface';
import { WebSocketMessageTypes } from '@services/websocket/websocket-message-types';
import { WebSocketHandlerRegistry } from '@services/websocket/websocket-handler-registry.service';
import { userSynchronized } from '@store/store.actions';

@Injectable({
  providedIn: 'root'
})
export class SynchronizeUserFinishedHandler implements WebSocketMessageHandler<any> {
  public messageType: string = WebSocketMessageTypes.SYNCHRONIZE_USER_FINISHED;

  constructor(
    private _store: Store,
    private _handlerRegistry: WebSocketHandlerRegistry
  ) {
    this._handlerRegistry.registerHandler(this);
  }

  public handle(message: WebSocketMessage<any>): void {
    if (message.payload) {
      console.log('User synchronization finished:', message.payload);
      this._store.dispatch(userSynchronized({ user: message.payload }));
    }
  }
}
