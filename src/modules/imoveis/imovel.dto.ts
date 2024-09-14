export type ImovelDTO = {
    id_imovel?: string;
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    estado: string;
    preco: number;
    proprietario: string;
    disponivel: boolean;
}