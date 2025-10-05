import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketMessage } from './websocket-message.interface';
import { WebSocketHandlerRegistry } from './websocket-handler-registry.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<WebSocketMessage>();

  constructor(
    private ngZone: NgZone,
    private handlerRegistry: WebSocketHandlerRegistry
  ) {}

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
    const handler = this.handlerRegistry.getHandler(message.type);
    if (handler) {
      handler.handle(message);
    } else {
      console.log('Unhandled WebSocket message type:', message.type);
    }
  }
}
