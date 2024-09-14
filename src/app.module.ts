import { Module } from '@nestjs/common';
import { ImoveisModule } from './modules/imoveis/imoveis.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ImoveisModule, ReservasModule, UsuariosModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}