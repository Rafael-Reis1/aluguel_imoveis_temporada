import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService) {}

    async validateUser(email: string, password: string) {
        const usuario = await this.usuariosService.findByEmail(email);
        
        if (usuario) {
            const senhaValida = await bcrypt.compare(password, usuario.senha);

            if (senhaValida) {
                return {
                    ...usuario
                }
            }

        }

        throw new Error('Email ou senha incorretos!')
    }
}
