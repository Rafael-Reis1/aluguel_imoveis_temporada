import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { UsuarioAtual } from '../auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('me')
  getMe(@UsuarioAtual() usuario: Usuario) {
    return usuario;
  }
}
