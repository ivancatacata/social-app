export interface PostAuthor {
  id: string;
  name: string;
  initials: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: PostAuthor;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: PostAuthor;
  content: string;
  imageUrl: string | null;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface CreatePostPayload {
  content: string;
  imageUrl: string | null;
}

export interface CreateCommentPayload {
  postId: string;
  content: string;
}

export interface FeedState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}
