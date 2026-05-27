import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Rol } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolesRepository: Repository<Rol>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const nuevoRol = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(nuevoRol);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    const rol = await this.rolesRepository.findOne({ where: { id_role: id } });
    if (!rol) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return rol;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const rol = await this.rolesRepository.preload({
      id_role: id,
      ...updateRoleDto,
    });
    if (!rol) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return await this.rolesRepository.save(rol);
  }

  async remove(id: number) {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    return { message: `Rol con ID ${id} eliminado correctamente` };
  }
}
