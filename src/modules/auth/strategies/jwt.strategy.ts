import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioFromJwt } from '../models/UsuarioFromJwt';
import { UsuarioPayload } from '../models/UsuarioPayload';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UsuarioPayload): Promise<UsuarioFromJwt> {
    return this.authService.validateUserEmail(payload.email);
  }
}