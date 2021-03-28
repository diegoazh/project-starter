import { Post, PostType } from '@prisma/client';

export class PostEntity implements Post {
  id: string;

  title: string;

  content: string;

  type: PostType;

  published: boolean;

  authorId: string;

  createdAt: Date;

  updatedAt: Date;
}
