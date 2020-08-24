import { PostType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @MaxLength(80)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(2000000)
  @MinLength(10)
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(PostType)
  @IsNotEmpty()
  type: PostType;

  @IsBoolean()
  @IsNotEmpty()
  published: boolean;
}
