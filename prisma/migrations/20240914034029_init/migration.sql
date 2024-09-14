-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
