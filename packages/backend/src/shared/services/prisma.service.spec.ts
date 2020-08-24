import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call $connect method when onModuleInit function is called', async () => {
    // Arrange
    jest.spyOn(service, '$connect');

    // Act
    await service.onModuleInit();

    // Assert
    expect(service.$connect).toHaveBeenCalledTimes(1);
    expect(service.$connect).toHaveBeenCalledWith();
  });

  it('should call $disconnect method when onModuleDestroy function is called', async () => {
    // Arrange
    jest.spyOn(service, '$disconnect');

    // Act
    await service.onModuleDestroy();

    // Assert
    expect(service.$disconnect).toHaveBeenCalledTimes(1);
    expect(service.$disconnect).toHaveBeenCalledWith();
  });
});
