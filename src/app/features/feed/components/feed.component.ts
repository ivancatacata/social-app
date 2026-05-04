import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedStore } from '../store/feed.store';
import { AuthStore } from '../../auth/store/auth.store';
import { Post } from '../../../core/models/post.model';
import { PostCardComponent } from './post-card.component';
import { CreatePostComponent } from './create-post.component';
import { AvatarComponent } from '../../../shared/components/avatar.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    CreatePostComponent,
    AvatarComponent,
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
    >
      <!-- Navbar -->
      <nav
        class="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg border-b border-white/5"
      >
        <div
          class="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between"
        >
          <!-- Brand -->
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0
                       012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span class="font-bold text-white text-lg tracking-tight"
              >Super Social App</span
            >
          </div>

          <!-- User + logout -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <app-avatar [initials]="authStore.userInitials()" size="sm" />
              <span class="text-sm text-slate-300 hidden sm:block">
                {{ authStore.displayName() }}
              </span>
            </div>
            <button
              type="button"
              (click)="authStore.logout()"
              class="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg
                     hover:bg-white/5 border border-white/10 hover:border-white/20
                     transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <!-- Main content -->
      <main class="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <app-create-post />

        <!-- Skeleton while loading -->
        <ng-container *ngIf="feedStore.isLoading()">
          <div
            *ngFor="let n of skeletons"
            class="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse"
          >
            <div class="flex gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-white/10"></div>
              <div class="flex-1 space-y-2 py-1">
                <div class="h-3 bg-white/10 rounded w-1/4"></div>
                <div class="h-2 bg-white/10 rounded w-1/6"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-3 bg-white/10 rounded"></div>
              <div class="h-3 bg-white/10 rounded w-4/5"></div>
            </div>
          </div>
        </ng-container>

        <!-- Posts -->
        <app-post-card
          *ngFor="let post of feedStore.sortedPosts(); trackBy: trackById"
          [post]="post"
        />

        <!-- Empty state -->
        <div
          *ngIf="!feedStore.isLoading() && feedStore.postCount() === 0"
          class="flex flex-col items-center justify-center py-20 text-slate-500"
        >
          <svg
            class="w-12 h-12 mb-3 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0
                     012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p class="text-sm">No posts yet. Be the first to share something!</p>
        </div>
      </main>
    </div>
  `,
})
export class FeedComponent implements OnInit {
  protected readonly feedStore = inject(FeedStore);
  protected readonly authStore = inject(AuthStore);

  readonly skeletons = [1, 2, 3];

  ngOnInit(): void {
    this.feedStore.hydrate();
    this.feedStore.loadPosts();
  }

  trackById(_index: number, post: Post): string {
    return post.id;
  }
}
