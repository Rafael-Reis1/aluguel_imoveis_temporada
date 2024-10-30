import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExiste = await this.prisma.usuario.findFirst({
      where: {
          email: createUsuarioDto.email
      }
    });
    if (usuarioExiste) {
      throw new HttpException('Usuario ja existe!', HttpStatus.CONFLICT);
    }

    const data = {
      ...createUsuarioDto,
      senha: await bcrypt.hash(createUsuarioDto.senha, 10),
    }

    const usuarioCriado = await this.prisma.usuario.create({ data });

    return {
      ...usuarioCriado,
      senha: undefined
    };
  }
  
  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: {
        email
      }
    });
  }

  findMe(usuario: Usuario) {
    return this.prisma.usuario.findFirst({
      include: {
        ImovelTemporada: true,
        ReservaTemporada: true
      },
      where: {
        id_usuario: usuario.id_usuario
      }
    });
  }
}
