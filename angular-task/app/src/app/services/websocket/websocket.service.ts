import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketMessage } from './websocket-message.interface';
import { WebSocketMessageTypes } from './websocket-message-types';
import { ReceiveMessageHandler, SynchronizeUserFinishedHandler } from '@handlers/index';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<WebSocketMessage>();
  private handlers: Map<string, any> = new Map();

  constructor(
    private ngZone: NgZone,
    private receiveMessageHandler: ReceiveMessageHandler,
    private synchronizeUserFinishedHandler: SynchronizeUserFinishedHandler
  ) {
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    this.handlers.set(WebSocketMessageTypes.RECEIVE_MESSAGE, this.receiveMessageHandler);
    this.handlers.set(WebSocketMessageTypes.SYNCHRONIZE_USER_FINISHED, this.synchronizeUserFinishedHandler);
  }

  public connect(url: string): Observable<WebSocketMessage> {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.ngZone.run(() => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.messageSubject.next(message);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return this.messageSubject.asObservable();
  }

  public sendMessage(message: WebSocketMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    const handler = this.handlers.get(message.type);
    if (handler) {
      handler.handle(message);
    } else {
      console.log('Unhandled WebSocket message type:', message.type);
    }
  }
}
