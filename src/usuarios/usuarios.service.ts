import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  // Crea un nuevo usuario y enlaza su rol correspondiente
  async create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = this.usuariosRepository.create({
      nombre: createUsuarioDto.nombre,
      correo: createUsuarioDto.correo,
      contrasena: createUsuarioDto.contrasena,
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

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.preload({
      id_usuario: id,
      ...updateUsuarioDto,
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
