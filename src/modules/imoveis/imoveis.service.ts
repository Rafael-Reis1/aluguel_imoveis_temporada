import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ImovelDTO } from './imovel.dto';

@Injectable()
export class ImoveisService {
    constructor(private prisma: PrismaService) {}
    async create(data: ImovelDTO) {
        const imovelExists = await this.prisma.imovelTemporada.findFirst({
            where: {
                endereco: data.endereco
            }
        });
        if (imovelExists) {
            throw new Error('Imovel ja existe!');
        }
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

    async deleteMany(data: { id_imovel: string}[]) {
        const ids = data.map(imovel => imovel.id_imovel);
        const imovelExists = await this.prisma.imovelTemporada.findMany({
            where: {
                id_imovel: { in: ids }
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
