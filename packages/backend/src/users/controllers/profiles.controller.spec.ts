import { Test, TestingModule } from '@nestjs/testing';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfilesService } from '../services/profiles.service';
import { ProfilesController } from './profiles.controller';

const profilesServiceMock = {
  find: jest.fn(),
  findById: jest.fn(),
  count: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  updateProperty: jest.fn(),
  remove: jest.fn(),
};

describe('Profiles Controller', () => {
  let controller: ProfilesController;
  let profilesService: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [{ provide: ProfilesService, useValue: profilesServiceMock }],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    profilesService = module.get<ProfilesService>(ProfilesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call profilesService.find with provided args when receive a GET HTTP request on /profiles', async () => {
    // Arrange
    const lastName = 'Doe';
    const args = { where: { lastName } };

    // Act
    await controller.find(args);

    // Assert
    expect(profilesService.find).toHaveBeenCalledTimes(1);
    expect(profilesService.find).toHaveBeenCalledWith(args);
  });

  it('should call profilesService.findById with provided args when receive a GET HTTP request on /profiles/:id', async () => {
    // Arrange
    const id = 1;

    // Act
    await controller.findById(id);

    // Assert
    expect(profilesService.findById).toHaveBeenCalledTimes(1);
    expect(profilesService.findById).toHaveBeenCalledWith(id);
  });

  it('should call profilesService.count with provided args when receive a GET HTTP request on /profiles/count', async () => {
    // Arrange
    const args = { where: { firstName: 'Alice' } };

    // Act
    await controller.count(args);

    // Assert
    expect(profilesService.count).toHaveBeenCalledTimes(1);
    expect(profilesService.count).toHaveBeenCalledWith(args);
  });

  it('should call profilesService.create with provided args when receive a POST HTTP request on /profiles', async () => {
    // Arrange
    const profile: CreateProfileDto = {
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempor efficitur eros ut vulputate. Nam hendrerit ultrices interdum. Pellentesque ut lacinia lacus. Vestibulum rhoncus lectus velit, quis maximus tellus posuere.',
      firstName: 'John',
      lastName: 'Doe',
      userId: 1,
    };

    // Act
    await controller.create(profile);

    // Assert
    expect(profilesService.create).toHaveBeenCalledTimes(1);
    expect(profilesService.create).toHaveBeenCalledWith(profile);
  });

  it('should call profilesService.update with provided args when receive a PUT HTTP request on /profiles/:id', async () => {
    // Arrange
    const id = 1;
    const profile: UpdateProfileDto = {
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In metus massa, tincidunt vitae lorem eget, convallis luctus felis. Vivamus tempus risus eu tempus ultricies. Phasellus pretium mauris a tempus cursus.',
      firstName: 'Alice',
      lastName: 'Smith',
    };

    // Act
    await controller.update(id, profile);

    // Assert
    expect(profilesService.update).toHaveBeenCalledTimes(1);
    expect(profilesService.update).toHaveBeenCalledWith(id, profile);
  });

  it('should call profilesService.updateProperty with provided args when receive a PATCH HTTP request on /profiles/:id', async () => {
    // Arrange
    const id = 1;
    const profile: PatchProfileDto = {
      lastName: 'Smith',
    };

    // Act
    await controller.updateProperty(id, profile);

    // Assert
    expect(profilesService.updateProperty).toHaveBeenCalledTimes(1);
    expect(profilesService.updateProperty).toHaveBeenCalledWith(id, profile);
  });

  it('should call profilesService.remove with provided args when receive a DELETE HTTP request on /profiles/:id', async () => {
    // Arrange
    const id = 1;

    // Act
    await controller.remove(id);

    // Assert
    expect(profilesService.remove).toHaveBeenCalledTimes(1);
    expect(profilesService.remove).toHaveBeenCalledWith(id);
  });
});
