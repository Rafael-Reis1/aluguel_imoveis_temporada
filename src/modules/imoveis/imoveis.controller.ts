import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { ImovelDTO } from './imovel.dto';
import { UsuarioAtual } from '../auth/decorators/usuario-atual.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}

  @Post()
  async create(@Body() data: ImovelDTO, @UsuarioAtual() usuario: Usuario) {
    return this.imoveisService.create(data, usuario);
  }

  @Get()
  async findAll() {
    return this.imoveisService.findAll();
  }

  @Delete('many')
  async deleteMany(@Body() data: { id_imovel: string}[], @UsuarioAtual() usuario: Usuario) {
    return this.imoveisService.deleteMany(data, usuario);
  }
}
