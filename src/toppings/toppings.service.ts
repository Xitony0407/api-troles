import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { Topping } from './entities/topping.entity';

@Injectable()
export class ToppingsService {
  constructor(
    @InjectRepository(Topping)
    private toppingsRepository: Repository<Topping>,
  ) {}

  async create(createToppingDto: CreateToppingDto) {
    const nuevoTopping = this.toppingsRepository.create(createToppingDto);
    return await this.toppingsRepository.save(nuevoTopping);
  }

  async findAll() {
    return await this.toppingsRepository.find();
  }

  async findOne(id: number) {
    const topping = await this.toppingsRepository.findOne({ where: { id_topping: id } });
    if (!topping) throw new NotFoundException(`Topping con ID ${id} no encontrado`);
    return topping;
  }

  async update(id: number, updateToppingDto: UpdateToppingDto) {
    const topping = await this.toppingsRepository.preload({
      id_topping: id,
      ...updateToppingDto,
    });
    if (!topping) throw new NotFoundException(`Topping con ID ${id} no encontrado`);
    return await this.toppingsRepository.save(topping);
  }

  async remove(id: number) {
    const result = await this.toppingsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Topping con ID ${id} no encontrado`);
    return { message: `Topping con ID ${id} eliminado correctamente` };
  }
}