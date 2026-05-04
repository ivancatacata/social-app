import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="sizeClass"
      class="rounded-full bg-blue-600/25 flex items-center justify-center
             flex-shrink-0 font-semibold text-blue-300 select-none"
    >
      {{ initials }}
    </div>
  `,
})
export class AvatarComponent {
  @Input({ required: true }) initials!: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get sizeClass(): string {
    const map: Record<string, string> = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
    };
    return map[this.size];
  }
}
