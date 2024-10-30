export type ReservaDTO = {
    id_reserva?: string;
    id_imovel: string;
    cliente: string;
    totalDias: string;
    totalPreco: number;
    data_entrada: Date;
    data_saida: Date;
}