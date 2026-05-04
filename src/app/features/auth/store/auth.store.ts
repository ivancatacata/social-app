import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import {
  AuthState,
  AuthCredentials,
  User,
} from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';

const AUTH_KEY = 'sp_auth_user';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isHydrated: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },

  withState<AuthState>(initialState),

  withComputed((store) => ({
    currentUser: computed(() => store.user()),
    isLoggedIn: computed(() => store.isAuthenticated()),
    isHydrated: computed(() => store.isHydrated()),
    displayName: computed(() => store.user()?.name ?? ''),
    userInitials: computed(() => store.user()?.avatarInitials ?? ''),
  })),

  withMethods((store) => {
    const storage = inject(StorageService);
    const router = inject(Router);
    const authService = inject(AuthService);

    return {
      hydrate(): void {
        const user = storage.get<User>(AUTH_KEY);

        if (user) {
          patchState(store, {
            user,
            isAuthenticated: true,
            isHydrated: true,
          });
        } else {
          patchState(store, {
            isHydrated: true,
          });
        }
      },
      async login(credentials: AuthCredentials): Promise<void> {
        patchState(store, { isLoading: true, error: null });
        try {
          const user = await authService.loginWithEmail(credentials);
          storage.set<User>(AUTH_KEY, user);
          patchState(store, { user, isAuthenticated: true, isLoading: false });
          await router.navigate(['/feed']);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed';
          patchState(store, { isLoading: false, error: message });
        }
      },

      async loginWithGoogle(): Promise<void> {
        patchState(store, { isLoading: true, error: null });
        try {
          const user = await authService.loginWithGoogle();
          storage.set<User>(AUTH_KEY, user);
          patchState(store, { user, isAuthenticated: true, isLoading: false });
          await router.navigate(['/feed']);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Google login failed';
          patchState(store, { isLoading: false, error: message });
        }
      },

      logout(): void {
        storage.remove(AUTH_KEY);
        patchState(store, {
          user: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
        });
        router.navigate(['/login']);
      },

      clearError(): void {
        patchState(store, { error: null });
      },
    };
  }),
);
