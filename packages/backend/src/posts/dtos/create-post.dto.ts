import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum PostType {
  TEXT = 'TEXT',
  GALLERY = 'GALLERY',
}

export class CreatePostDto {
  @MaxLength(80)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(2000000)
  @MinLength(10)
  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(PostType)
  @IsOptional()
  type: PostType;

  @IsBoolean()
  @IsOptional()
  published: boolean;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  authorid: string;
}
