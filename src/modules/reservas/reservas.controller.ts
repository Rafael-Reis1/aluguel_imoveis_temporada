import { Body, Controller, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservaDTO } from './reserva.dto';
import { UsuarioAtual } from '../auth/decorators/usuario-atual.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  async create(@Body() data: ReservaDTO, @UsuarioAtual() usuario: Usuario) {
    return this.reservasService.create(data, usuario);
  }
}
