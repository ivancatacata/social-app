import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { FeedStore } from '../store/feed.store';

export const feedResolver: ResolveFn<boolean> = async () => {
  const feedStore = inject(FeedStore);

  await feedStore.loadPosts();

  return true;
};
