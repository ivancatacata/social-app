import { computed, inject } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import {
  FeedState,
  Post,
  Comment,
  CreatePostPayload,
  CreateCommentPayload,
} from '../../../core/models/post.model';
import { FeedService } from '../../../core/services/feed.service';
import { StorageService } from '../../../core/services/storage.service';
import { AuthStore } from '../../auth/store/auth.store';
import { generateId, nowISO } from '../../../shared/utils/helpers';

const FEED_KEY = 'sp_feed_posts';

const initialState: FeedState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const FeedStore = signalStore(
  { providedIn: 'root' },

  withState<FeedState>(initialState),

  withComputed((store) => ({
    sortedPosts: computed(() =>
      [...store.posts()].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    ),
    postCount: computed(() => store.posts().length),
  })),

  withMethods((store) => {
    const feedService = inject(FeedService);
    const storageService = inject(StorageService);
    const authStore = inject(AuthStore);

    function persist(posts: Post[]): void {
      storageService.set<Post[]>(FEED_KEY, posts);
      patchState(store, { posts });
    }

    return {
      hydrate(): void {
        const posts = storageService.get<Post[]>(FEED_KEY) ?? [];
        patchState(store, { posts });
      },

      async loadPosts(): Promise<void> {
        if (store.posts().length > 0) return;

        patchState(store, { isLoading: true, error: null });
        try {
          const posts = await feedService.getMockPosts();
          persist(posts);
          patchState(store, { isLoading: false });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Failed to load posts';
          patchState(store, { isLoading: false, error: message });
        }
      },

      createPost(payload: CreatePostPayload): void {
        const user = authStore.currentUser();
        if (!user) return;

        const newPost: Post = {
          id: generateId(),
          author: {
            id: user.id,
            name: user.name,
            initials: user.avatarInitials,
          },
          content: payload.content,
          imageUrl: payload.imageUrl,
          likes: [],
          comments: [],
          createdAt: nowISO(),
        };

        persist([newPost, ...store.posts()]);
      },

      addComment(payload: CreateCommentPayload): void {
        const user = authStore.currentUser();
        if (!user) return;

        const comment: Comment = {
          id: generateId(),
          postId: payload.postId,
          author: {
            id: user.id,
            name: user.name,
            initials: user.avatarInitials,
          },
          content: payload.content,
          createdAt: nowISO(),
        };

        const updated = store
          .posts()
          .map(
            (post): Post =>
              post.id === payload.postId
                ? { ...post, comments: [...post.comments, comment] }
                : post,
          );

        persist(updated);
      },

      toggleLike(postId: string): void {
        const userId = authStore.currentUser()?.id;
        if (!userId) return;

        const updated = store.posts().map((post): Post => {
          if (post.id !== postId) return post;

          const alreadyLiked = post.likes.includes(userId);

          return {
            ...post,
            likes: alreadyLiked
              ? post.likes.filter((id) => id !== userId)
              : [...post.likes, userId],
          };
        });

        persist(updated);
      },
    };
  }),
);
