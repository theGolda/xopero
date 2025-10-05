import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store'
import { userReducer } from '@store/store.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { StoreEffects } from '@store/store.effects'
import { TranslateModule, TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '@services/custom-mat-paginator/custom-mat-paginator-intl.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: userReducer }),
    provideEffects(StoreEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({prefix:"assets/i18n/"}),
      fallbackLang: 'en',
      lang: 'pl'
  }),
  {
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl
  }
]
};
