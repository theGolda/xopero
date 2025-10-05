import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { WebSocketMessage } from './websocket-message.interface';
import { WebSocketHandlerRegistry } from './websocket-handler-registry.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private _socket!: WebSocket;
  private _messageSubject = new Subject<WebSocketMessage>();

  constructor(
    private _ngZone: NgZone,
    private _handlerRegistry: WebSocketHandlerRegistry
  ) {}

  public connect(url: string): Observable<WebSocketMessage> {
    this._socket = new WebSocket(url);

    this._socket.onmessage = (event) => {
      this._ngZone.run(() => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this._messageSubject.next(message);
          this._handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
    };

    this._socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this._socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return this._messageSubject.asObservable();
  }

  public sendMessage(message: WebSocketMessage): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public disconnect(): void {
    if (this._socket) {
      this._socket.close();
    }
  }

  private _handleMessage(message: WebSocketMessage): void {
    const handler = this._handlerRegistry.getHandler(message.type);
    if (handler) {
      handler.handle(message);
    } else {
      console.log('Unhandled WebSocket message type:', message.type);
    }
  }
}
