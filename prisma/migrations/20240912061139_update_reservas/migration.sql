/*
  Warnings:

  - Added the required column `data_saida` to the `reservas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reservas" (
    "id_reserva" TEXT NOT NULL PRIMARY KEY,
    "id_imovel" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "data_entrada" DATETIME NOT NULL,
    "data_saida" DATETIME NOT NULL,
    CONSTRAINT "reservas_id_imovel_fkey" FOREIGN KEY ("id_imovel") REFERENCES "imoveis" ("id_imovel") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reservas" ("cliente", "data_entrada", "id_imovel", "id_reserva") SELECT "cliente", "data_entrada", "id_imovel", "id_reserva" FROM "reservas";
DROP TABLE "reservas";
ALTER TABLE "new_reservas" RENAME TO "reservas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
