import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfilesService } from './profiles.service';

const prismaServiceMock = {
  profile: {
    findMany: jest.fn(() => []),
    findFirst: jest.fn(() => ({})),
    findUnique: jest.fn(() => ({})),
    count: jest.fn(() => 1),
    create: jest.fn(() => ({})),
    update: jest.fn(() => ({})),
    delete: jest.fn(() => ({})),
  },
};

describe('ProfilesService', () => {
  let service: ProfilesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call prisma.profile.finMany with arguments when call find method', async () => {
    // Arrange
    const args = { where: { id: 1 } };

    // Act
    await service.find(args);

    // Assert
    expect(prisma.profile.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.profile.findMany).toHaveBeenCalledWith(args);
  });

  it('should call prisma.profile.findUnique with arguments when call findById method', async () => {
    // Arrange
    const id = 'abc-def-ghi';
    const expectedArgs = { where: { id } };

    // Act
    await service.findById(id);

    // Assert
    expect(prisma.profile.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.profile.findUnique).toHaveBeenCalledWith(expectedArgs);
  });

  it('should throw a not found exception when call findById method and any profile was found', async () => {
    // Arrange
    let errorThrown;
    const id = 'abc-def-ghi';
    const expectedArgs = { where: { id } };
    jest
      .spyOn(prismaServiceMock.profile, 'findUnique')
      .mockImplementationOnce(() => Promise.resolve(null));

    // Act
    try {
      await service.findById(id);
    } catch (error) {
      errorThrown = error;
    }

    // Assert
    expect(prisma.profile.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.profile.findUnique).toHaveBeenCalledWith(expectedArgs);
    expect(errorThrown).toBeInstanceOf(NotFoundException);
  });

  it('should call prisma.profile.count with arguments when call count method', async () => {
    // Arrange
    const args = { where: { lastName: 'Doe' } };

    // Act
    await service.count(args as any);

    // Assert
    expect(prisma.profile.count).toHaveBeenCalledTimes(1);
    expect(prisma.profile.count).toHaveBeenCalledWith(args);
  });

  it('should call prisma profile.create with arguments when call create method', async () => {
    // Arrange
    const profile: CreateProfileDto = {
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor efficitur eros ut vulputate. Nam hendrerit ultrices interdum. Pellentesque ut lacinia lacus. Vestibulum rhoncus lectus velit, quis maximus tellus posuere.',
      firstName: 'John',
      lastName: 'Doe',
      userId: 'abcd-efgh-ijkl-mnop',
    };
    const expectedArgs = { data: { ...profile } };

    // Act
    await service.create(profile);

    // Assert
    expect(prisma.profile.create).toHaveBeenCalledTimes(1);
    expect(prisma.profile.create).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma.profile.update with arguments and update all profile data when call update method', async () => {
    // Arrange
    const oldProfile = {
      id: 1,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus faucibus mauris porta rutrum. Nam eu cursus urna. Aliquam at porttitor purus, ac ultrices eros. Sed consectetur orci fringilla, fermentum.',
      firstName: 'John',
      lastName: 'Doe',
      userId: 1,
      createdAt: '12/12/12T10:30:23',
      updatedAt: '12/12/12T10:30:23',
    };
    const profile: UpdateProfileDto = {
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In metus massa, tincidunt vitae lorem eget, convallis luctus felis. Vivamus tempus risus eu tempus ultricies. Phasellus pretium mauris a tempus cursus.',
      firstName: 'Alice',
      lastName: 'Smith',
    };
    const id = 'abc-def-ghi';

    const expectedArgs = {
      where: { id },
      data: { ...oldProfile, ...profile },
    };
    jest.spyOn(service, 'findById');
    (prisma.profile.findUnique as any).mockReturnValue(oldProfile);

    // Act
    await service.update(id, profile);

    // Assert
    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(prisma.profile.update).toHaveBeenCalledTimes(1);
    expect(prisma.profile.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should call prisma.profile.update with arguments and update the passed properties of the profile data when call updateProperty method', async () => {
    // Arrange
    const oldProfile = {
      id: 1,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus faucibus mauris porta rutrum. Nam eu cursus urna. Aliquam at porttitor purus, ac ultrices eros. Sed consectetur orci fringilla, fermentum.',
      firstName: 'John',
      lastName: 'Doe',
      userId: 1,
      createdAt: '12/12/12T10:30:23',
      updatedAt: '12/12/12T10:30:23',
    };
    const profile: PatchProfileDto = {
      lastName: 'Smith',
    };
    const id = 'abc-def-ghi';

    const expectedArgs = {
      where: { id },
      data: { ...oldProfile, ...profile },
    };
    jest.spyOn(service, 'findById');
    (prisma.profile.findUnique as any).mockReturnValue(oldProfile);

    // Act
    await service.updateProperty(id, profile);

    // Assert
    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(prisma.profile.update).toHaveBeenCalledTimes(1);
    expect(prisma.profile.update).toHaveBeenCalledWith(expectedArgs);
  });

  it('should not call prisma.profile.update when any changes are sent to updateProperty method', async () => {
    // Arrange
    const oldProfile = {
      id: 1,
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus faucibus mauris porta rutrum. Nam eu cursus urna. Aliquam at porttitor purus, ac ultrices eros. Sed consectetur orci fringilla, fermentum.',
      firstName: 'John',
      lastName: 'Doe',
      userId: 1,
      createdAt: '12/12/12T10:30:23',
      updatedAt: '12/12/12T10:30:23',
    };
    const profile: PatchProfileDto = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const id = 'abcd-efgh-ijkl-mnop';
    jest.spyOn(service, 'findById');
    (prisma.profile.findUnique as any).mockReturnValue(oldProfile);

    // Act
    await service.updateProperty(id, profile);

    // Assert
    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(prisma.profile.update).not.toHaveBeenCalled();
  });

  it('should call prisma.profile.delete with arguments when call remove method', async () => {
    // Arrange
    const id = 'abc-def-ghi';
    const expectedArgs = { where: { id } };

    // Act
    await service.remove(id);

    // Assert
    expect(prisma.profile.delete).toHaveBeenCalledTimes(1);
    expect(prisma.profile.delete).toHaveBeenCalledWith(expectedArgs);
  });
});
