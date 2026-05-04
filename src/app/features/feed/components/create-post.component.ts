import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FeedStore } from '../store/feed.store';
import { AuthStore } from '../../auth/store/auth.store';
import { AvatarComponent } from '../../../shared/components/avatar.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarComponent],
  template: `
    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div class="flex gap-3">
        <app-avatar [initials]="authStore.userInitials()" size="md" />
        <textarea
          [formControl]="contentCtrl"
          placeholder="What's on your mind?"
          rows="3"
          class="flex-1 bg-transparent text-white placeholder-slate-500
                 text-sm leading-relaxed resize-none outline-none"
        >
        </textarea>
      </div>

      <!-- Optional image URL -->
      <div *ngIf="showImageField" class="mt-3 pt-3 border-t border-white/5">
        <input
          type="url"
          [formControl]="imageCtrl"
          placeholder="Paste an image URL (optional)"
          class="w-full bg-white/5 border border-white/10 text-white
                 placeholder-slate-500 rounded-xl px-3 py-2 text-sm
                 outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div
        class="flex items-center justify-between mt-4 pt-4 border-t border-white/5"
      >
        <button
          type="button"
          (click)="showImageField = !showImageField"
          class="flex items-center gap-1.5 text-slate-400 hover:text-slate-300
                 text-sm px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
                     a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
                     a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Photo
        </button>

        <button
          type="button"
          (click)="onPost()"
          [disabled]="contentCtrl.invalid"
          class="bg-blue-600 hover:bg-blue-500 text-white font-semibold
                 text-sm px-5 py-2 rounded-xl transition-colors
                 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>
    </div>
  `,
})
export class CreatePostComponent {
  protected readonly feedStore = inject(FeedStore);
  protected readonly authStore = inject(AuthStore);
  private readonly fb = inject(FormBuilder);

  contentCtrl = this.fb.control('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  imageCtrl = this.fb.control('');
  showImageField = false;

  onPost(): void {
    const content = this.contentCtrl.value?.trim();
    if (!content) return;

    this.feedStore.createPost({
      content,
      imageUrl: this.imageCtrl.value?.trim() || null,
    });

    this.contentCtrl.reset();
    this.imageCtrl.reset();
    this.showImageField = false;
  }
}
