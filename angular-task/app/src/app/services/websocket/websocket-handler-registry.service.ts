import { Injectable, Injector } from '@angular/core';
import { WebSocketMessageHandler } from './websocket-message.interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketHandlerRegistry {
  private handlers: Map<string, WebSocketMessageHandler> = new Map();

  constructor(private injector: Injector) {}

  registerHandler(handler: WebSocketMessageHandler): void {
    this.handlers.set(handler.messageType, handler);
  }

  getHandler(messageType: string): WebSocketMessageHandler | undefined {
    return this.handlers.get(messageType);
  }
}
