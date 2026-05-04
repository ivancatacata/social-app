import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { AuthStore } from '../../features/auth/store/auth.store';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true;
  }

  const auth = inject(AuthStore);
  const router = inject(Router);
  if (!auth.isHydrated()) {
    return true;
  }

  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true;
  }
  const auth = inject(AuthStore);
  const router = inject(Router);
  return auth.isLoggedIn() ? router.createUrlTree(['/feed']) : true;
};
