import { Injectable } from '@nestjs/common';
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
                estado: data.estado
            }
        });
        if (imovelExists) {
            throw new Error('Imovel ja existe!');
        }
        data.proprietario = usuario.id_usuario;
        const imovel = await this.prisma.imovelTemporada.create({ data });
        return imovel
    }

    async findAll() {
        return this.prisma.imovelTemporada.findMany({
            include: {
                ReservaTemporada: true
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
            throw new Error('Imovel não existe!');
        }
        return await this.prisma.imovelTemporada.deleteMany({
            where: {
                id_imovel: { in: ids }
            }
        });
    }
}
