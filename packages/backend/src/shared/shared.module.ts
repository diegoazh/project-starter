import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
// import { CryptoService } from './services/crypto.service';

@Module({
  providers: [PrismaService /* CryptoService */],
  exports: [PrismaService],
})
export class SharedModule {}
