import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Crea un nuevo usuario y enlaza su rol correspondiente
  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt(10);
    const hashContrasena = await bcrypt.hash(createUsuarioDto.contrasena, salt);

    const nuevoUsuario = this.usuariosRepository.create({
      nombre: createUsuarioDto.nombre,
      correo: createUsuarioDto.correo,
      contrasena: hashContrasena,
      rol: { id_role: createUsuarioDto.rol.id_role } // Enlace de la llave foránea
    });
    return await this.usuariosRepository.save(nuevoUsuario);
  }

  // Retorna todos los usuarios incluyendo los datos de su rol asignado
  async findAll() {
    return await this.usuariosRepository.find({
      relations: ['rol'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id_usuario: id },
      relations: ['rol'],
    });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  // Busca un usuario por correo (útil para login)
  async findByCorreo(correo: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOne({
      where: { correo },
      relations: ['rol'],
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const datosActualizados = { ...updateUsuarioDto };

    // Si se incluye contraseña, la encriptamos antes de guardar
    if (datosActualizados.contrasena) {
      const salt = await bcrypt.genSalt(10);
      datosActualizados.contrasena = await bcrypt.hash(datosActualizados.contrasena, salt);
    }

    const usuario = await this.usuariosRepository.preload({
      id_usuario: id,
      ...datosActualizados,
    });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return await this.usuariosRepository.save(usuario);
  }

  async remove(id: number) {
    const result = await this.usuariosRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
