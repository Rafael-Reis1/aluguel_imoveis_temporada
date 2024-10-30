import { Usuario } from "../entities/usuario.entity";
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class CreateUsuarioDto extends Usuario {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Senha muito fraca',
    })
    senha: string;
  
    @IsString()
    nome: string;
}