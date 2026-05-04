import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { sleep } from '../../shared/utils/helpers';

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function minsAgo(mins: number): string {
  return new Date(Date.now() - mins * 60 * 1000).toISOString();
}

const MOCK_POSTS: Post[] = [
  {
    id: 'post-001',
    author: { id: 'user-002', name: 'Bruce Wayne', initials: 'BW' },
    content:
      'Otra noche tranquila en Gotham… digo, tranquila para mis estándares 🦇',
    imageUrl: null,
    likes: ['user-003', 'user-004'],
    comments: [
      {
        id: 'comment-001',
        postId: 'post-001',
        author: { id: 'user-003', name: 'Clark Kent', initials: 'CK' },
        content: 'Si necesitás ayuda sabés dónde encontrarme 😉',
        createdAt: minsAgo(25),
      },
    ],
    createdAt: hoursAgo(1),
  },
  {
    id: 'post-002',
    author: { id: 'user-003', name: 'Clark Kent', initials: 'CK' },
    content:
      'Día ocupado salvando gente, pero igual llegué a tiempo para ver el atardecer 🌇',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80',
    likes: ['user-001', 'user-002', 'user-004'],
    comments: [],
    createdAt: hoursAgo(4),
  },
  {
    id: 'post-003',
    author: { id: 'user-004', name: 'Diana Prince', initials: 'DP' },
    content:
      'Entrenamiento completado 💪 La disciplina siempre le gana al talento.',
    imageUrl: null,
    likes: ['user-002', 'user-005'],
    comments: [
      {
        id: 'comment-002',
        postId: 'post-003',
        author: { id: 'user-002', name: 'Bruce Wayne', initials: 'BW' },
        content: 'Totalmente de acuerdo.',
        createdAt: minsAgo(40),
      },
    ],
    createdAt: hoursAgo(6),
  },
  {
    id: 'post-004',
    author: { id: 'user-005', name: 'Barry Allen', initials: 'BA' },
    content: 'Corrí tan rápido que llegué antes de publicar este post ⚡️',
    imageUrl: null,
    likes: ['user-002', 'user-003'],
    comments: [],
    createdAt: minsAgo(10),
  },
];

@Injectable({ providedIn: 'root' })
export class FeedService {
  async getMockPosts(): Promise<Post[]> {
    await sleep(600);
    return structuredClone(MOCK_POSTS);
  }
}
