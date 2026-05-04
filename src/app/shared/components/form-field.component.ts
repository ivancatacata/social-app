import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <!-- Label -->
      <label class="block text-sm font-medium text-slate-300 mb-1.5">
        {{ label }}
      </label>

      <!-- Input wrapper -->
      <div class="relative">
        <input
          [type]="isPassword ? (showPassword ? 'text' : 'password') : type"
          [placeholder]="placeholder"
          [formControl]="control"
          class="w-full bg-white/5 border text-white placeholder-slate-500
                 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors pr-10"
          [ngClass]="{
            'border-white/10': !invalid,
            'focus:border-blue-500': !invalid,
            'border-red-500': invalid,
          }"
        />

        <!-- 👁 Toggle password -->
        <button
          *ngIf="isPassword"
          type="button"
          (click)="togglePassword()"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
        >
          {{ showPassword ? '🙈' : '👁' }}
        </button>
      </div>

      <!-- Error -->
      <p *ngIf="invalid" class="text-red-400 text-xs mt-1">
        {{ error }}
      </p>
    </div>
  `,
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input() error: string = '';

  showPassword = false;

  get invalid(): boolean {
    return this.control?.invalid && this.control?.touched;
  }

  get isPassword(): boolean {
    return this.type === 'password';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
