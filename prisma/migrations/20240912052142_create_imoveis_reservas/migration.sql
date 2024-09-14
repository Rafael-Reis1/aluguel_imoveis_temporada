-- CreateTable
CREATE TABLE "imoveis" (
    "id_imovel" TEXT NOT NULL PRIMARY KEY,
    "endereco" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "reservas" (
    "id_reserva" TEXT NOT NULL PRIMARY KEY,
    "id_imovel" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "data_entrada" DATETIME NOT NULL,
    CONSTRAINT "reservas_id_imovel_fkey" FOREIGN KEY ("id_imovel") REFERENCES "imoveis" ("id_imovel") ON DELETE RESTRICT ON UPDATE CASCADE
);
