import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class PatchUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @MaxLength(32)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  oldPassword?: string;

  @MaxLength(32)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  newPassword?: string;

  @MaxLength(32)
  @MinLength(4)
  @IsString()
  @IsOptional()
  username?: string;
}
