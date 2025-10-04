import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from '@app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store'
import { userReducer } from '@store/store.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { StoreEffects } from '@store/store.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: userReducer }),
    provideEffects(StoreEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
