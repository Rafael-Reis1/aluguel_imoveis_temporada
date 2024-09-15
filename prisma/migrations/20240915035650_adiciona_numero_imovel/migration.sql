/*
  Warnings:

  - Added the required column `numero` to the `imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_imoveis" (
    "id_imovel" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL,
    CONSTRAINT "imoveis_proprietario_fkey" FOREIGN KEY ("proprietario") REFERENCES "usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_imoveis" ("bairro", "cep", "disponivel", "estado", "id_imovel", "localidade", "logradouro", "preco", "proprietario") SELECT "bairro", "cep", "disponivel", "estado", "id_imovel", "localidade", "logradouro", "preco", "proprietario" FROM "imoveis";
DROP TABLE "imoveis";
ALTER TABLE "new_imoveis" RENAME TO "imoveis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
