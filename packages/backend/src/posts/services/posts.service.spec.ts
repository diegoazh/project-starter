import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreatePostDto, PostType } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostsService } from './posts.service';

const prismaServiceMock = {
  post: {
    findMany: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PostsService', () => {
  let service: PostsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call prisma post.finMany with arguments when call find method', async () => {
    // Arrange
    const args = { where: { id: 1 } };

    // Act
    await service.find(args);

    // Assert
    expect(prisma.post.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.post.findMany).toHaveBeenCalledWith(args);
  });

  it('should call prisma post.findOne with arguments when call findById method', async () => {
    // Arrange
    const id = 7;
    const expectedArgs = { where: { id } };

    // Act
    await service.findById(id);

    // Assert
    expect(prisma.post.findOne).toHaveBeenCalledTimes(1);
    expect(prisma.post.findOne).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma post.count with arguments when call count method', async () => {
    // Arrange
    const args = { where: { published: true } };

    // Act
    await service.count(args);

    // Assert
    expect(prisma.post.count).toHaveBeenCalledTimes(1);
    expect(prisma.post.count).toHaveBeenCalledWith(args);
  });

  it('should call prisma post.create with arguments when call create method', async () => {
    // Arrange
    const post: CreatePostDto = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur nunc mi, nec ullamcorper augue maximus id. Nam lacinia sapien.',
      published: true,
      type: PostType.TEXT,
      authorId: 1,
    };
    const expectedArgs = { data: { ...post, author: null } };

    // Act
    await service.create(post);

    // Assert
    expect(prisma.post.create).toHaveBeenCalledTimes(1);
    expect(prisma.post.create).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma post.update with arguments and update all post data when call update method', async () => {
    // Arrange
    const oldPost = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur nunc mi, nec ullamcorper augue maximus id. Nam lacinia sapien.',
      published: true,
      type: PostType.TEXT,
      authorId: 1,
    };
    const post: UpdatePostDto = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor leo sit amet lobortis tempor. Sed in luctus felis, non.',
      published: false,
      type: PostType.IMAGE,
    };
    const id = 1;

    const expectedArgs = {
      where: { id },
      data: { ...oldPost, ...post },
    };

    (prisma.post.findOne as any).mockReturnValue(oldPost);

    // Act
    await service.update(id, post);

    // Assert
    expect(prisma.post.update).toHaveBeenCalledTimes(1);
    expect(prisma.post.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma post.update with arguments and update the passed properties of the post data when call updateProperty method', async () => {
    // Arrange
    const oldPost = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur nunc mi, nec ullamcorper augue maximus id. Nam lacinia sapien.',
      published: true,
      type: PostType.TEXT,
      authorId: 1,
    };
    const post: PatchPostDto = {
      published: false,
    };
    const id = 10;

    const expectedArgs = {
      where: { id },
      data: { ...oldPost, ...post },
    };

    (prisma.post.findOne as any).mockReturnValue(oldPost);

    // Act
    await service.updateProperty(id, post);

    // Assert
    expect(prisma.post.update).toHaveBeenCalledTimes(1);
    expect(prisma.post.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma post.update with arguments and not update the post data when call updateProperty method with empty data', async () => {
    // Arrange
    const oldPost = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur nunc mi, nec ullamcorper augue maximus id. Nam lacinia sapien.',
      published: true,
      type: PostType.TEXT,
      authorId: 1,
    };
    const post: PatchPostDto = {
      title: '',
    };
    const id = 10;

    (prisma.post.findOne as any).mockReturnValue(oldPost);

    // Act
    const result = await service.updateProperty(id, post);

    // Assert
    expect(prisma.post.update).not.toHaveBeenCalled();
    expect(result).toEqual(oldPost);
  });

  it('should call prisma post.update with arguments and set an empty content when call updateProperty method', async () => {
    // Arrange
    const oldPost = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque consectetur nunc mi, nec ullamcorper augue maximus id. Nam lacinia sapien.',
      published: true,
      type: PostType.TEXT,
      authorId: 1,
    };
    const post: PatchPostDto = {
      content: '',
    };
    const id = 10;

    const expectedArgs = {
      where: { id },
      data: { ...oldPost, ...post },
    };

    (prisma.post.findOne as any).mockReturnValue(oldPost);

    // Act
    await service.updateProperty(id, post);

    // Assert
    expect(prisma.post.update).toHaveBeenCalledTimes(1);
    expect(prisma.post.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma post.delete with arguments when call remove method', async () => {
    // Arrange
    const id = 5;
    const expectedArgs = { where: { id } };

    // Act
    await service.remove(id);

    // Assert
    expect(prisma.post.delete).toHaveBeenCalledTimes(1);
    expect(prisma.post.delete).toHaveBeenCalledWith(expectedArgs);
  });
});
