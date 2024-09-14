import { Body, Controller, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservaDTO } from './reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  async create(@Body() data: ReservaDTO) {
    return this.reservasService.create(data);
  }
}
