import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login.component').then(
        (m) => m.LoginComponent,
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./features/feed/components/feed.component').then(
        (m) => m.FeedComponent,
      ),
    canActivate: [authGuard],
    resolve: {
      feed: () =>
        import('./features/feed/resolvers/feed.resolver').then(
          (m) => m.feedResolver,
        ),
    },
  },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: '**', redirectTo: '/feed' },
];
