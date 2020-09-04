import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { CryptoService } from './services/crypto.service';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [BcryptService, CryptoService, PrismaService],
  exports: [BcryptService, CryptoService, PrismaService],
})
export class SharedModule {}
