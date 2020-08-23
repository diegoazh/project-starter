import { PostType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PatchPostDto {
  @MaxLength(80)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  title?: string;

  @MaxLength(2000000)
  @MinLength(5)
  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(PostType)
  @IsOptional()
  type?: PostType;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
