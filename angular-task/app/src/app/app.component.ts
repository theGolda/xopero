import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from '@services/websocket.service'
import { Subscription } from 'rxjs'
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  private wsSub!: Subscription;

  constructor(private websocketService: WebsocketService) {
  }

  ngOnInit() {
    this.wsSub = this.websocketService.connect(environment.websocketUrl).subscribe(msg => {
      console.log("New message:", msg);
    });
  }
}
