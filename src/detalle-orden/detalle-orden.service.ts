import { Injectable } from '@nestjs/common';
import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Injectable()
export class DetalleOrdenService {
  create(createDetalleOrdenDto: CreateDetalleOrdenDto) {
    return 'This action adds a new detalleOrden';
  }

  findAll() {
    return `This action returns all detalleOrden`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleOrden`;
  }

  update(id: number, updateDetalleOrdenDto: UpdateDetalleOrdenDto) {
    return `This action updates a #${id} detalleOrden`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleOrden`;
  }
}
