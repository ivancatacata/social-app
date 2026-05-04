import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Post, Comment } from '../../../core/models/post.model';
import { FeedStore } from '../store/feed.store';
import { AuthStore } from '../../auth/store/auth.store';
import { AvatarComponent } from '../../../shared/components/avatar.component';
import { CommentComponent } from './comment.component';
import { formatRelativeTime } from '../../../shared/utils/helpers';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AvatarComponent,
    CommentComponent,
  ],
  template: `
    <article
      class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden
                    hover:border-white/20 transition-colors"
    >
      <!-- Header -->
      <div class="flex items-center gap-3 px-5 pt-5 pb-3">
        <app-avatar [initials]="post.author.initials" size="md" />
        <div>
          <p class="font-semibold text-white text-sm">{{ post.author.name }}</p>
          <p class="text-slate-500 text-xs">{{ relativeTime }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="px-5 pb-3">
        <p
          class="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap break-words"
        >
          {{ post.content }}
        </p>
      </div>

      <!-- Image -->
      <img
        *ngIf="post.imageUrl"
        [src]="post.imageUrl"
        alt="Post image"
        class="w-full object-cover max-h-80"
      />

      <!-- Action bar -->
      <div class="flex items-center gap-1 px-5 py-3 border-t border-white/5">
        <!-- Like -->
        <button
          type="button"
          (click)="onToggleLike()"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                 transition-colors hover:bg-white/5"
          [class.text-pink-400]="hasLiked"
          [class.text-slate-400]="!hasLiked"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            [attr.fill]="hasLiked ? 'currentColor' : 'none'"
          >
            <path
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682
                     a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318
                     a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{{ post.likes.length }}</span>
        </button>

        <!-- Toggle comments -->
        <button
          type="button"
          (click)="showComments.set(!showComments())"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                 text-slate-400 hover:bg-white/5 transition-colors"
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03
                     8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72
                     C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9
                     3.582 9 8z"
            />
          </svg>
          <span>{{ post.comments.length }}</span>
        </button>
      </div>

      <!-- Comments panel -->
      <div
        *ngIf="showComments()"
        class="px-5 pb-5 pt-4 border-t border-white/5 space-y-3"
      >
        <app-comment
          *ngFor="let c of post.comments; trackBy: trackById"
          [comment]="c"
        />

        <!-- Add comment -->
        <div class="flex items-center gap-2 pt-1">
          <app-avatar [initials]="authStore.userInitials()" size="sm" />
          <input
            type="text"
            [formControl]="commentCtrl"
            placeholder="Write a comment…"
            (keydown.enter)="onAddComment()"
            class="flex-1 bg-white/5 border border-white/10 text-white
                   placeholder-slate-500 rounded-xl px-3 py-2 text-sm
                   outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="button"
            (click)="onAddComment()"
            [disabled]="commentCtrl.invalid"
            class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2
                   rounded-xl text-sm font-medium transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    </article>
  `,
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;

  protected readonly feedStore = inject(FeedStore);
  protected readonly authStore = inject(AuthStore);

  readonly showComments = signal(false);
  readonly commentCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  get hasLiked(): boolean {
    const userId = this.authStore.currentUser()?.id;
    return !!userId && this.post.likes.includes(userId);
  }

  get relativeTime(): string {
    return formatRelativeTime(this.post.createdAt);
  }

  onToggleLike(): void {
    this.feedStore.toggleLike(this.post.id);
  }

  onAddComment(): void {
    const content = this.commentCtrl.value?.trim();
    if (!content) return;
    this.feedStore.addComment({ postId: this.post.id, content });
    this.commentCtrl.reset();
  }

  trackById(_index: number, item: Comment): string {
    return item.id;
  }
}
