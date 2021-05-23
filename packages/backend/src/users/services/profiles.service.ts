import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyProfileArgs, Profile, Subset } from 'prisma';
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

  async findById(id: string): Promise<Profile> {
    const profileFound = await this.prisma.profile.findUnique({
      where: { id },
    });

    if (!profileFound) {
      throw new NotFoundException('any profile was found');
    }

    return profileFound;
  }

  count(
    query?: Pick<
      FindManyProfileArgs,
      'where' | 'orderBy' | 'cursor' | 'take' | 'skip' | 'distinct'
    >,
  ): Promise<number> {
    return this.prisma.profile.count(query);
  }

  create(data: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({
      data: { ...data },
    });
  }

  async update(id: string, data: UpdateProfileDto): Promise<Profile> {
    const savedProfile = await this.findById(id);

    return this.prisma.profile.update({
      where: { id },
      data: { ...savedProfile, ...data },
    });
  }

  async updateProperty(id: string, profile: PatchProfileDto): Promise<Profile> {
    const savedProfile = await this.findById(id);

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
      return this.prisma.profile.update({
        where: { id },
        data: { ...savedProfile },
      });
    }

    return savedProfile;
  }

  remove(id: string): Promise<Profile> {
    return this.prisma.profile.delete({ where: { id } });
  }
}
