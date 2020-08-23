import { Injectable } from '@nestjs/common';
import { FindManyProfileArgs, Profile, Subset } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { PatchProfileDto } from '../dtos/patch-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  find(
    query?: Subset<FindManyProfileArgs, FindManyProfileArgs>,
  ): Promise<Profile[]> {
    return this.prisma.profile.findMany(query);
  }

  findById(id: number): Promise<Profile> {
    return this.prisma.profile.findOne({ where: { id } });
  }

  count(
    query?: Pick<
      FindManyProfileArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.prisma.profile.count(query);
  }

  create(profile: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({ data: { ...profile, user: null } });
  }

  async update(id: number, profile: UpdateProfileDto): Promise<Profile> {
    const savedProfile = await this.prisma.profile.findOne({ where: { id } });
    const { bio, firstName, lastName } = profile;

    savedProfile.bio = bio;
    savedProfile.firstName = firstName;
    savedProfile.lastName = lastName;

    return this.prisma.profile.update({
      where: { id },
      data: { ...savedProfile },
    });
  }

  async updateProperty(id: number, profile: PatchProfileDto): Promise<Profile> {
    const savedProfile = await this.prisma.profile.findOne({ where: { id } });
    const { bio, firstName, lastName } = profile;

    savedProfile.bio = bio || savedProfile.bio;
    savedProfile.firstName = firstName || savedProfile.firstName;
    savedProfile.lastName = lastName || savedProfile.lastName;

    return this.prisma.profile.update({
      where: { id },
      data: { ...savedProfile },
    });
  }

  remove(id: number): Promise<Profile> {
    return this.prisma.profile.delete({ where: { id } });
  }
}
