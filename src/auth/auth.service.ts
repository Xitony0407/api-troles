import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { correo, contrasena } = loginDto;

    // Buscar el usuario por correo
    const usuario = await this.usuariosService.findByCorreo(correo);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas (correo o contraseña no coinciden)');
    }

    // Comparar la contraseña ingresada con el hash en la base de datos
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esValida) {
      throw new UnauthorizedException('Credenciales incorrectas (correo o contraseña no coinciden)');
    }

    // Generar el Payload del JWT
    const payload = {
      sub: usuario.id_usuario,
      correo: usuario.correo,
      nombre: usuario.nombre,
      rol: usuario.rol ? usuario.rol.nombre : null,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }
}
