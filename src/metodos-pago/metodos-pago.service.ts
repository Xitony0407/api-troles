import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetodoPagoDto } from './dto/create-metodos-pago.dto';
import { UpdateMetodoPagoDto } from './dto/update-metodos-pago.dto';
import { MetodoPago } from './entities/metodos-pago.entity';

@Injectable()
export class MetodosPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private metodosPagoRepository: Repository<MetodoPago>,
  ) {}

  async create(createMetodoPagoDto: CreateMetodoPagoDto) {
    const nuevoMetodo = this.metodosPagoRepository.create(createMetodoPagoDto);
    return await this.metodosPagoRepository.save(nuevoMetodo);
  }

  async findAll() {
    return await this.metodosPagoRepository.find();
  }

  async findOne(id: number) {
    const metodo = await this.metodosPagoRepository.findOne({ where: { id_metodo: id } });
    if (!metodo) throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    return metodo;
  }

  async update(id: number, updateMetodoPagoDto: UpdateMetodoPagoDto) {
    const metodo = await this.metodosPagoRepository.preload({
      id_metodo: id,
      ...updateMetodoPagoDto,
    });
    if (!metodo) throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    return await this.metodosPagoRepository.save(metodo);
  }

  async remove(id: number) {
    const result = await this.metodosPagoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Método de pago con ID ${id} no encontrado`);
    return { message: `Método de pago con ID ${id} eliminado correctamente` };
  }
}
