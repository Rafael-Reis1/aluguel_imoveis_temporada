import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsuarioAtual } from '../auth/decorators/usuario-atual.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { ImoveisService } from './imoveis.service';
import { ImovelDTO } from './imovel.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}

  @Post()
  async create(@Body() data: ImovelDTO, @UsuarioAtual() usuario: Usuario) {
    return this.imoveisService.create(data, usuario);
  }

  @Get()
  async findAll(@UsuarioAtual() usuario: Usuario) {
    return this.imoveisService.findAll(usuario);
  }

  @IsPublic()
  @Get('public')
  async findAllPublic() {
    return this.imoveisService.findAllPublic();
  }

  @Delete('many')
  async deleteMany(@Body() data: { id_imovel: string}[], @UsuarioAtual() usuario: Usuario) {
    return this.imoveisService.deleteMany(data, usuario);
  }

  @Put('atualiza-imovel')
  async atualizaImovel(@Body() data: ImovelDTO, @UsuarioAtual() usuario: Usuario) {
    return this.imoveisService.atualizaImovel(data, usuario);
  }

  @Post('id')
  async encontrarImovel(@Body('id_imovel') id_imovel: string) {
    return this.imoveisService.encontraImovelPorId(id_imovel);
  }
}
