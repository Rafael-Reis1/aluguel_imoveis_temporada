import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ReservaDTO } from './reserva.dto';

@Injectable()
export class ReservasService {
    constructor(private prisma: PrismaService) {}
    async create(data: ReservaDTO) {
        const reservaExists = await this.prisma.reservaTemporada.findFirst({
            where: {
                OR: [{
                        AND: [{
                            data_entrada: {
                                gte: data.data_entrada,
                            }},
                            {data_entrada: {
                                lte: data.data_saida
                            }},
                            { id_imovel: data.id_imovel }
                        ]
                    },
                    {
                        AND: [{
                            data_saida: {
                                gte: data.data_entrada,
                            }},
                            {data_saida: {
                                lte: data.data_saida
                            }},
                            { id_imovel: data.id_imovel }
                        ]
                    }
                ]
            }
        })
        if (reservaExists) {
            throw new Error('Reserva ja existe para esse imovel!');
        }
        const reserva = await this.prisma.reservaTemporada.create({ data });
        return reserva;
    }
}