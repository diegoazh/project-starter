import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
  IsPositive,
} from 'class-validator';

export enum PostType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
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
  type: PostType = PostType.TEXT;

  @IsBoolean()
  @IsOptional()
  published = false;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
