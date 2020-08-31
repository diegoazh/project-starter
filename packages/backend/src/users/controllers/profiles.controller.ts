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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyProfileArgs, Subset } from '@prisma/client';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfileDeletedResponse } from '../responses/profile-deleted.response';
import { ProfileResponse } from '../responses/profile.response';
import { ProfilesCountResponse } from '../responses/profiles-count.response';
import { ProfilesResponse } from '../responses/profiles.response';
import { ProfilesService } from '../services/profiles.service';

@ApiTags('Profiles controller')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  find(
    @Query() query?: Subset<FindManyProfileArgs, FindManyProfileArgs>,
  ): Promise<ProfilesResponse> {
    return this.profilesService.find(query);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ProfileResponse> {
    return this.profilesService.findById(id);
  }

  @Get('count')
  count(
    @Query()
    query: Pick<
      FindManyProfileArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<ProfilesCountResponse> {
    return this.profilesService.count(query);
  }

  @Post()
  create(@Body() profile: CreateProfileDto): Promise<ProfileResponse> {
    return this.profilesService.create(profile);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() profile: UpdateProfileDto,
  ): Promise<ProfileResponse> {
    return this.profilesService.update(id, profile);
  }

  @Patch(':id')
  updateProperty(
    @Param('id') id: number,
    profile: PatchProfileDto,
  ): Promise<ProfileResponse> {
    return this.profilesService.updateProperty(id, profile);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<ProfileDeletedResponse> {
    return this.profilesService.remove(id);
  }
}
