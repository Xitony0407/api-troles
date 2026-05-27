import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadosOrdenDto } from './dto/create-estados-orden.dto';
import { UpdateEstadosOrdenDto } from './dto/update-estados-orden.dto';
import { EstadoOrden } from './entities/estados-orden.entity';

@Injectable()
export class EstadosOrdenService {
  constructor(
    @InjectRepository(EstadoOrden)
    private estadosOrdenRepository: Repository<EstadoOrden>,
  ) {}

  async create(createEstadosOrdenDto: CreateEstadosOrdenDto) {
    const nuevoEstado = this.estadosOrdenRepository.create(createEstadosOrdenDto);
    return await this.estadosOrdenRepository.save(nuevoEstado);
  }

  async findAll() {
    return await this.estadosOrdenRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} estadosOrden`;
  }

  update(id: number, updateEstadosOrdenDto: UpdateEstadosOrdenDto) {
    return `This action updates a #${id} estadosOrden`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadosOrden`;
  }
}