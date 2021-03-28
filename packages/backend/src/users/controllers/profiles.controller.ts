import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindManyProfileArgs, Subset } from 'prisma';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfileDeletedResponse } from '../responses/profile-deleted.response';
import { ProfileResponse } from '../responses/profile.response';
import { ProfilesCountResponse } from '../responses/profiles-count.response';
import { ProfilesResponse } from '../responses/profiles.response';
import { ProfilesService } from '../services/profiles.service';

@ApiTags('Profiles controller')
@ApiBearerAuth()
@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async find(
    @Query() query?: Subset<FindManyProfileArgs, FindManyProfileArgs>,
  ): Promise<ProfilesResponse> {
    const profiles = await this.profilesService.find(query);

    return { data: { profiles } };
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProfileResponse> {
    const profile = await this.profilesService.findById(id);

    return { data: { profile } };
  }

  @Get('count')
  async count(
    @Query()
    query: Pick<
      FindManyProfileArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<ProfilesCountResponse> {
    const count = await this.profilesService.count(query);

    return { data: { profiles: { count } } };
  }

  @Post()
  async create(@Body() profile: CreateProfileDto): Promise<ProfileResponse> {
    const newProfile = await this.profilesService.create(profile);

    return { data: { profile: newProfile } };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() profile: UpdateProfileDto,
  ): Promise<ProfileResponse> {
    const updatedProfile = await this.profilesService.update(id, profile);

    return { data: { profile: updatedProfile } };
  }

  @Patch(':id')
  async updateProperty(
    @Param('id') id: number,
    profile: PatchProfileDto,
  ): Promise<ProfileResponse> {
    const updatedProfile = await this.profilesService.updateProperty(
      id,
      profile,
    );

    return { data: { profile: updatedProfile } };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ProfileDeletedResponse> {
    const deleted = await this.profilesService.remove(id);

    return { data: { profile: { deleted } } };
  }
}
