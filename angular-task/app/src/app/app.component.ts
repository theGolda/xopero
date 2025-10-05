import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { connectWebSocket } from '@store/store.actions';
import { ReceiveMessageHandler, SynchronizeUserFinishedHandler } from './handlers/index';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    TranslateModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  selectedLanguage = 'en';
  languages = [
    { value: 'en', label: 'English' },
    { value: 'pl', label: 'Polski' }
  ];

  constructor(
    private store: Store,
    private receiveMessageHandler: ReceiveMessageHandler,
    private synchronizeUserFinishedHandler: SynchronizeUserFinishedHandler,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(connectWebSocket());
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
    this.translate.use(language);
  }
}
