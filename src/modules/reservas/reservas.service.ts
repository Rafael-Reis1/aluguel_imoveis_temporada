import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ReservaDTO } from './reserva.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { ImoveisService } from '../imoveis/imoveis.service';

@Injectable()
export class ReservasService {
    constructor(private prisma: PrismaService, private readonly imoveisService: ImoveisService) {}
    async create(data: ReservaDTO, usuario: Usuario) {
      try {
        const imovel = await this.imoveisService.encontraImovelPorId(data.id_imovel);
        const reservaExists = await this.prisma.reservaTemporada.findFirst({
          where: {
            OR: [
              {
                AND: [
                  { data_entrada: { gte: data.data_entrada } },
                  { data_entrada: { lte: data.data_saida } },
                  { id_imovel: data.id_imovel }
                ]
              },
              {
                AND: [
                  { data_saida: { gte: data.data_entrada } },
                  { data_saida: { lte: data.data_saida } },
                  { id_imovel: data.id_imovel }
                ]
              },
              {
                AND: [
                  { data_entrada: { lte: data.data_entrada } },
                  { data_saida: { gte: data.data_saida } },
                  { id_imovel: data.id_imovel }
                ]
              }
            ]
          }
        })
        if (reservaExists) {
          throw new HttpException('Reserva já existe nessa data para esse imóvel!', HttpStatus.CONFLICT);
        }
        if (!(await imovel).disponivel) {
          throw new HttpException('Imovel indisponivel', HttpStatus.FORBIDDEN);
        }
        data.cliente = usuario.id_usuario;
        const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
        const dataSaida = new Date(data.data_saida);
        const timestampdataSaida = dataSaida.getTime();
        const dataEntrada = new Date(data.data_entrada);
        const timestampdataEntrada = dataEntrada.getTime();
        const diferencaEmMilissegundos = timestampdataSaida - timestampdataEntrada;
        const totalDias = Math.floor(diferencaEmMilissegundos / umDiaEmMilissegundos) + 1;
        const totalPreco = (await imovel).preco * totalDias;
        data.totalDias = totalDias.toString();
        data.totalPreco = totalPreco;
        return await this.prisma.reservaTemporada.create({ data });
        
      } catch (error) {
        if (error.status === 404) {
          throw new HttpException('Imovel não existe!', HttpStatus.NOT_FOUND);
        }
        else if (error.status === 409) {
          throw new HttpException('Reserva já existe nessa data para esse imóvel!', HttpStatus.CONFLICT);
        }
        else if (error.status === 403) {
          throw new HttpException('Imovel indisponivel', HttpStatus.FORBIDDEN);
        }
      }
    }

    async findAll(usuario: Usuario) {
        return this.prisma.reservaTemporada.findMany({
          include: {
            imoveis: true
          },
          where: {
              cliente: usuario.id_usuario
          }
        });
    }

    async deleteMany(data: { id_reserva: string }[], usuario: Usuario) {
        const ids = data.map(reserva => reserva.id_reserva);
        const reservaExists = await this.prisma.reservaTemporada.findMany({
            where: {
                id_reserva: { in: ids },
                cliente: usuario.id_usuario
            }
        });
        if(reservaExists.length === 0) {
          throw new HttpException('Reserva não existe!', HttpStatus.NOT_FOUND);
        }
        return await this.prisma.reservaTemporada.deleteMany({
            where: {
                id_reserva: { in: ids }
            }
        });
    }

    async atualizaReserva(data: ReservaDTO, usuario: Usuario) {
      const reservaExists = await this.prisma.reservaTemporada.findFirst({
        where: {
          id_reserva: data.id_reserva,
          cliente: usuario.id_usuario
        }
      });
      if(!reservaExists) {
        throw new HttpException('Reserva não existe!', HttpStatus.NOT_FOUND);
      }
      return await this.prisma.reservaTemporada.update({
        where: {
          id_reserva: data.id_reserva,
          cliente: usuario.id_usuario
        },
        data: {
          data_entrada: data.data_entrada,
          data_saida: data.data_saida
        }
      });
    }
}
