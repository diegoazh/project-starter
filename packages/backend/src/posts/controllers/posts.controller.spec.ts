import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto, PostType } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostsService } from '../services/posts.service';
import { PostsController } from './posts.controller';

const postsServiceMock = {
  find: jest.fn(),
  findById: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateProperty: jest.fn(),
  remove: jest.fn(),
};

describe('Posts Controller', () => {
  let controller: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: postsServiceMock }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call postsService.find with provided args when receive a GET HTTP request on /posts', async () => {
    // Arrange
    const title = 'Test title';
    const args = { where: { title } };

    // Act
    await controller.find(args);

    // Assert
    expect(postsService.find).toHaveBeenCalledTimes(1);
    expect(postsService.find).toHaveBeenCalledWith(args);
  });

  it('should call postsService.findById with provided args when receive a GET HTTP request on /posts/:id', async () => {
    // Arrange
    const id = 1;

    // Act
    await controller.findById(id);

    // Assert
    expect(postsService.findById).toHaveBeenCalledTimes(1);
    expect(postsService.findById).toHaveBeenCalledWith(id);
  });

  it('should call postsService.count with provided args when receive a GET HTTP request on /posts/count', async () => {
    // Arrange
    const args = { where: { published: true } } as any;

    // Act
    await controller.count(args);

    // Assert
    expect(postsService.count).toHaveBeenCalledTimes(1);
    expect(postsService.count).toHaveBeenCalledWith(args);
  });

  it('should call postsService.create with provided args when receive a POST HTTP request on /posts', async () => {
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

    // Act
    await controller.create(post);

    // Assert
    expect(postsService.create).toHaveBeenCalledTimes(1);
    expect(postsService.create).toHaveBeenCalledWith(post);
  });

  it('should call postsService.update with provided args when receive a PUT HTTP request on /posts/:id', async () => {
    // Arrange
    const id = 1;
    const post: UpdatePostDto = {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor leo sit amet lobortis tempor. Sed in luctus felis, non.',
      published: false,
      type: PostType.GALLERY,
    };

    // Act
    await controller.update(id, post);

    // Assert
    expect(postsService.update).toHaveBeenCalledTimes(1);
    expect(postsService.update).toHaveBeenCalledWith(id, post);
  });

  it('should call postsService.updateProperty with provided args when receive a PATCH HTTP request on /posts/:id', async () => {
    // Arrange
    const id = 1;
    const post: PatchPostDto = {
      published: false,
    };

    // Act
    await controller.updateProperty(id, post);

    // Assert
    expect(postsService.updateProperty).toHaveBeenCalledTimes(1);
    expect(postsService.updateProperty).toHaveBeenCalledWith(id, post);
  });

  it('should call postsService.remove with provided args when receive a DELETE HTTP request on /posts/:id', async () => {
    // Arrange
    const id = 1;

    // Act
    await controller.remove(id);

    // Assert
    expect(postsService.remove).toHaveBeenCalledTimes(1);
    expect(postsService.remove).toHaveBeenCalledWith(id);
  });
});
