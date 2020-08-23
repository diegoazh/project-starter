import { Post, PostType } from '@prisma/client';

export class PostResponse implements Post {
  id: number;

  title: string;

  content: string;

  type: PostType;

  published: boolean;

  authorId: number;

  createdAt: Date;

  updatedAt: Date;
}
