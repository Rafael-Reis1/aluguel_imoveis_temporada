export type ImovelDTO = {
    id_imovel?: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    localidade: string;
    estado: string;
    uf: string;
    preco: number;
    proprietario: string;
    disponivel: boolean;
}