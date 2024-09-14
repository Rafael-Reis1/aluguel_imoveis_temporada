/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `endereco` on the `imoveis` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disponivel` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_imoveis" (
    "id_imovel" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL,
    CONSTRAINT "imoveis_proprietario_fkey" FOREIGN KEY ("proprietario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_imoveis" ("id_imovel", "preco", "proprietario") SELECT "id_imovel", "preco", "proprietario" FROM "imoveis";
DROP TABLE "imoveis";
ALTER TABLE "new_imoveis" RENAME TO "imoveis";
CREATE TABLE "new_reservas" (
    "id_reserva" TEXT NOT NULL PRIMARY KEY,
    "id_imovel" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "data_entrada" DATETIME NOT NULL,
    "data_saida" DATETIME NOT NULL,
    CONSTRAINT "reservas_id_imovel_fkey" FOREIGN KEY ("id_imovel") REFERENCES "imoveis" ("id_imovel") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reservas_cliente_fkey" FOREIGN KEY ("cliente") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reservas" ("cliente", "data_entrada", "data_saida", "id_imovel", "id_reserva") SELECT "cliente", "data_entrada", "data_saida", "id_imovel", "id_reserva" FROM "reservas";
DROP TABLE "reservas";
ALTER TABLE "new_reservas" RENAME TO "reservas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
