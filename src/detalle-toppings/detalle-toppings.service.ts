import { Injectable } from '@nestjs/common';
import { CreateDetalleToppingDto } from './dto/create-detalle-topping.dto';
import { UpdateDetalleToppingDto } from './dto/update-detalle-topping.dto';

@Injectable()
export class DetalleToppingsService {
  create(createDetalleToppingDto: CreateDetalleToppingDto) {
    return 'This action adds a new detalleTopping';
  }

  findAll() {
    return `This action returns all detalleToppings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleTopping`;
  }

  update(id: number, updateDetalleToppingDto: UpdateDetalleToppingDto) {
    return `This action updates a #${id} detalleTopping`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleTopping`;
  }
}
