import { Injectable, Injector } from '@angular/core';

import { WebSocketMessageHandler } from './websocket-message.interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketHandlerRegistry {
  private _handlers: Map<string, WebSocketMessageHandler> = new Map();

  constructor(private _injector: Injector) {}

  public registerHandler(handler: WebSocketMessageHandler): void {
    this._handlers.set(handler.messageType, handler);
  }

  public getHandler(messageType: string): WebSocketMessageHandler | undefined {
    return this._handlers.get(messageType);
  }
}
