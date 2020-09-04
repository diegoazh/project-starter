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

  @MaxLength(32, { message: 'pass.max.len.dto' })
  @MinLength(8, { message: 'pass.min.len.dto' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @MaxLength(32, { message: 'username.max.len.dto' })
  @MinLength(4, { message: 'username.min.len.dto' })
  @IsString()
  @IsOptional()
  username?: string;
}
