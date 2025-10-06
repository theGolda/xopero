import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { connectWebSocket } from '@store/store.actions';
import { ReceiveMessageHandler, SynchronizeUserFinishedHandler } from '@handlers/index';

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
export class AppComponent implements OnInit {
  public title = 'app';
  public selectedLanguage = 'en';
  public languages = [
    { value: 'en', label: 'English' },
    { value: 'pl', label: 'Polski' }
  ];

  constructor(
    private _store: Store,
    private _receiveMessageHandler: ReceiveMessageHandler,
    private _synchronizeUserFinishedHandler: SynchronizeUserFinishedHandler,
    private _translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this._store.dispatch(connectWebSocket());
    this._translate.setDefaultLang('en');
    this._translate.use('en');
  }

  public onLanguageChange(language: string): void {
    this.selectedLanguage = language;
    this._translate.use(language);
  }
}
