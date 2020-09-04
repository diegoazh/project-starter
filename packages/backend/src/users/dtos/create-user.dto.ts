import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(32, { message: 'hrkXvLA' })
  @MinLength(8, { message: 'dKxcSlZ' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @MaxLength(32, { message: 'gMbEGLG' })
  @MinLength(4, { message: 'uqeybUm' })
  @IsString()
  @IsOptional()
  username?: string;
}
