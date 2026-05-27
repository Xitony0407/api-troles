import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaborDto } from './dto/create-sabore.dto';
import { UpdateSaborDto } from './dto/update-sabore.dto';
import { Sabor } from './entities/sabore.entity';

@Injectable()
export class SaboresService {
  constructor(
    @InjectRepository(Sabor)
    private saboresRepository: Repository<Sabor>,
  ) {}

  // Guarda un nuevo sabor en la base de datos
  async create(createSaborDto: CreateSaborDto) {
    const nuevoSabor = this.saboresRepository.create(createSaborDto);
    return await this.saboresRepository.save(nuevoSabor);
  }

  // Trae todos los sabores disponibles
  async findAll() {
    return await this.saboresRepository.find();
  }

  async findOne(id: number) {
    const sabor = await this.saboresRepository.findOne({ where: { id_sabor: id } });
    if (!sabor) throw new NotFoundException(`Sabor con ID ${id} no encontrado`);
    return sabor;
  }

  async update(id: number, updateSaborDto: UpdateSaborDto) {
    const sabor = await this.saboresRepository.preload({
      id_sabor: id,
      ...updateSaborDto,
    });
    if (!sabor) throw new NotFoundException(`Sabor con ID ${id} no encontrado`);
    return await this.saboresRepository.save(sabor);
  }

  async remove(id: number) {
    const result = await this.saboresRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Sabor con ID ${id} no encontrado`);
    return { message: `Sabor con ID ${id} eliminado correctamente` };
  }
}