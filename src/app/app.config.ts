import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { AuthStore } from './features/auth/store/auth.store';

function hydrateAuth(authStore: InstanceType<typeof AuthStore>): () => void {
  return () => authStore.hydrate();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: APP_INITIALIZER,
      useFactory: hydrateAuth,
      deps: [AuthStore],
      multi: true,
    },
  ],
};
