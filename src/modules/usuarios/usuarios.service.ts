import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

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
        throw new Error('Usuario ja existe!');
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


  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: {
        email
      }
    });
  }
}
