import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt'
import { UsuarioPayload } from './models/UsuarioPayload';
import { JwtService } from '@nestjs/jwt';
import { UsuarioToken } from './models/UsuarioToken';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
    constructor(private readonly usuariosService: UsuariosService, private readonly jwtService: JwtService) {}

    login(usuario: Usuario): UsuarioToken {
      const payload: UsuarioPayload = {
        sub: usuario.id_usuario,
        email: usuario.email,
        nome: usuario.nome
      }

      const jwtToken = this.jwtService.sign(payload);

      return {
        access_token: jwtToken
      }
    }
    
    async validateUser(email: string, password: string) {
        const usuario = await this.usuariosService.findByEmail(email);
        
        if (usuario) {
            const senhaValida = await bcrypt.compare(password, usuario.senha);

            if (senhaValida) {
                return {
                    ...usuario,
                    senha: undefined
                }
            }
        }

        throw new HttpException('Email ou senha incorretos!', HttpStatus.UNAUTHORIZED);
    }

    async validateUserEmail(email: string) {
      const usuario = await this.usuariosService.findByEmail(email);
      
      if (usuario) {
        return {
            ...usuario,
            senha: undefined
        }
      }

      throw new HttpException('Usuario não existe!', HttpStatus.NOT_FOUND);
  }
}
