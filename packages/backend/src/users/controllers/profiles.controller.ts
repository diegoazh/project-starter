import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { FindManyProfileArgs, Subset } from '@prisma/client';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfileResponse } from '../responses/profile.response';
import { ProfilesService } from '../services/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  find(@Query() query?: Subset<FindManyProfileArgs, FindManyProfileArgs>): Promise<ProfileResponse[]> {
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
  ): Promise<number> {
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
  remove(@Param('id') id: number): Promise<ProfileResponse> {
    return this.profilesService.remove(id);
  }
}