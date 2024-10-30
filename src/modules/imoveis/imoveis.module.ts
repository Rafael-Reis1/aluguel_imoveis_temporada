import { Module } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { ImoveisController } from './imoveis.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ImoveisController],
  providers: [ImoveisService, PrismaService],
  exports: [ImoveisService]
})
export class ImoveisModule {}
