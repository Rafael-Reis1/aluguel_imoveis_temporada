import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ImovelDTO } from './imovel.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ImoveisService {
    constructor(private prisma: PrismaService) {}
    async create(data: ImovelDTO, usuario: Usuario) {
        const imovelExists = await this.prisma.imovelTemporada.findFirst({
            where: {
                cep: data.cep,
                logradouro: data.logradouro,
                numero: data.numero,
                bairro: data.bairro,
                localidade: data.localidade,
                estado: data.estado,
                uf: data.uf
            }
        });
        if (imovelExists) {
            throw new HttpException('O imóvel já existe', HttpStatus.CONFLICT);
        }
        data.proprietario = usuario.id_usuario;
        const imovel = await this.prisma.imovelTemporada.create({ data });
        return imovel
    }

    async findAll(usuario: Usuario) {
        return this.prisma.imovelTemporada.findMany({
            include: {
                ReservaTemporada: {
                  include: {
                    usuarios: true, // Inclui os dados do usuário que fez a reserva
                  },
                },
            },
            where: {
                proprietario: usuario.id_usuario
            }
        });
    }

    findAllPublic() {
        return this.prisma.imovelTemporada.findMany({
            where: {
                disponivel: true
            }
        });
    }

    async deleteMany(data: { id_imovel: string}[], usuario: Usuario) {
        const ids = data.map(imovel => imovel.id_imovel);
        const imovelExists = await this.prisma.imovelTemporada.findMany({
            where: {
                id_imovel: { in: ids },
                proprietario: usuario.id_usuario
            }
        });
        if(imovelExists.length === 0) {
            throw new HttpException('Imovel não existe!', HttpStatus.NOT_FOUND);
        }
        return await this.prisma.imovelTemporada.deleteMany({
            where: {
                id_imovel: { in: ids }
            }
        });
    }

    async atualizaImovel(data: ImovelDTO, usuario: Usuario) {
        const imovelExists = await this.prisma.imovelTemporada.findFirst({
            where: {
              id_imovel: data.id_imovel,
              proprietario: usuario.id_usuario,
            },
          });
          if (!imovelExists) {
            throw new HttpException('Imovel não existe!', HttpStatus.NOT_FOUND);
          }
          return await this.prisma.imovelTemporada.update({
            where: {
              id_imovel: data.id_imovel,
            },
            data: data,
          });
    }

    async encontraImovelPorId(data: string) {
        const imovelExists = await this.prisma.imovelTemporada.findFirst({
            include: {
                ReservaTemporada: {
                  include: {
                    usuarios: true, // Inclui os dados do usuário que fez a reserva
                  },
                },
            },
            where : {
                id_imovel: data
            }
        })
        if (!imovelExists) {
            throw new HttpException('Imovel não existe!', HttpStatus.NOT_FOUND);
        }
        return imovelExists;
    }
}
