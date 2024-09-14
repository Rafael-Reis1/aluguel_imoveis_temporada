import { Body, Controller, Get, Post } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuarioAtual } from '../auth/decorators/usuario-atual.decorator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosService } from './usuarios.service';

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
