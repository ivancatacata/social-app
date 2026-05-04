import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { AuthStore } from '../store/auth.store';
import { FormFieldComponent } from '../../../shared/components/form-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  template: `
    <div
      class="min-h-screen flex items-center justify-center px-4
                bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
    >
      <div
        class="w-full max-w-md bg-white/5 border border-white/10
                  rounded-2xl p-8 backdrop-blur-xl shadow-2xl"
      >
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <div
            class="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30
                      flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0
                       012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white">Welcome back</h1>
          <p class="text-slate-400 text-sm mt-1">Sign in to your social feed</p>
        </div>

        <!-- Google button -->
        <button
          type="button"
          (click)="onGoogleLogin()"
          [disabled]="store.isLoading()"
          class="w-full flex items-center justify-center gap-3 bg-white text-slate-700
                 font-medium py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-colors
                 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26
                     1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74
                     3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23
                     1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99
                     20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43
                     8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09
                     14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6
                     3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <!-- Divider -->
        <div class="flex items-center gap-3 mb-6">
          <div class="flex-1 h-px bg-white/10"></div>
          <span class="text-slate-500 text-xs uppercase tracking-wider"
            >or</span
          >
          <div class="flex-1 h-px bg-white/10"></div>
        </div>

        <!-- Form -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          novalidate
          class="space-y-4"
        >
          <!-- Email -->
          <app-form-field
            label="Email"
            type="email"
            placeholder="oliver@queen.com"
            [control]="emailCtrl"
            error="Enter a valid email address."
          />

          <!-- Password -->
          <app-form-field
            label="Password"
            type="password"
            placeholder="••••••••"
            [control]="passwordCtrl"
            error="Password must be at least 8 characters."
          />

          <!-- Server error -->
          <div
            *ngIf="store.error()"
            class="bg-red-500/10 border border-red-500/20 text-red-400
                      text-sm rounded-xl px-4 py-3"
          >
            {{ store.error() }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="store.isLoading()"
            class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold
                   py-2.5 px-4 rounded-xl transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
          >
            <svg
              *ngIf="store.isLoading()"
              class="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            {{ store.isLoading() ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>

        <!-- Demo hint -->
        <p class="text-center text-slate-600 text-xs mt-6">
          Demo&nbsp;&nbsp;
          <span class="text-slate-400">oliver&#64;queen.com</span>
          &nbsp;/&nbsp;
          <span class="text-slate-400">password123</span>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  protected readonly store = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get emailCtrl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordCtrl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  isFieldInvalid(ctrl: AbstractControl): boolean {
    return ctrl.invalid && ctrl.touched;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.store.login({
      email: this.form.value.email!,
      password: this.form.value.password!,
    });
  }

  onGoogleLogin(): void {
    this.store.loginWithGoogle();
  }
}
