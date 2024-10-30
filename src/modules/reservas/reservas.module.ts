import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ImoveisService } from '../imoveis/imoveis.service';
import { ImoveisModule } from '../imoveis/imoveis.module';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService, PrismaService],
  imports: [ImoveisModule]
})
export class ReservasModule {}
