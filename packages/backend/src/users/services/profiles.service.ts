import { Injectable } from '@nestjs/common';
import { FindManyProfileArgs, Subset } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfileDeletedResponse } from '../responses/profile-deleted.response';
import { ProfileResponse } from '../responses/profile.response';
import { ProfilesCountResponse } from '../responses/profiles-count.response';
import { ProfilesResponse } from '../responses/profiles.response';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async find(
    query?: Subset<FindManyProfileArgs, FindManyProfileArgs>,
  ): Promise<ProfilesResponse> {
    const profiles = await this.prisma.profile.findMany(query);

    return { data: { profiles } };
  }

  async findById(id: number): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.findOne({ where: { id } });

    return { data: { profile } };
  }

  async count(
    query?: Pick<
      FindManyProfileArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<ProfilesCountResponse> {
    const count = await this.prisma.profile.count(query);

    return { data: { profiles: { count } } };
  }

  async create(data: CreateProfileDto): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.create({
      data: { ...data, user: null },
    });

    return { data: { profile } };
  }

  async update(id: number, data: UpdateProfileDto): Promise<ProfileResponse> {
    const savedProfile = await this.prisma.profile.findOne({ where: { id } });

    const profile = await this.prisma.profile.update({
      where: { id },
      data: { ...savedProfile, ...data },
    });

    return { data: { profile } };
  }

  async updateProperty(
    id: number,
    profile: PatchProfileDto,
  ): Promise<ProfileResponse> {
    const savedProfile = await this.prisma.profile.findOne({ where: { id } });
    let newProfile = null;

    const mustBeUpdated = Object.keys(profile).reduce(
      (needsUpdate, property) => {
        if (savedProfile[property] !== profile[property]) {
          savedProfile[property] = profile[property];
          return true;
        }

        return needsUpdate;
      },
      false,
    );

    if (mustBeUpdated) {
      newProfile = await this.prisma.profile.update({
        where: { id },
        data: { ...savedProfile },
      });
    }

    return { data: { profile: newProfile || savedProfile } };
  }

  async remove(id: number): Promise<ProfileDeletedResponse> {
    const deleted = await this.prisma.profile.delete({ where: { id } });

    return { data: { profile: { deleted } } };
  }
}
