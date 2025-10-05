import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { connectWebSocket } from '@store/store.actions';
import { ReceiveMessageHandler, SynchronizeUserFinishedHandler } from './handlers/index';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';

  constructor(
    private store: Store,
    private receiveMessageHandler: ReceiveMessageHandler,
    private synchronizeUserFinishedHandler: SynchronizeUserFinishedHandler
  ) {
  }

  ngOnInit() {
    this.store.dispatch(connectWebSocket());
  }
}
