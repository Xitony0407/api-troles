import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductosBaseDto } from './dto/create-productos-base.dto';
import { UpdateProductosBaseDto } from './dto/update-productos-base.dto';
import { ProductoBase } from './entities/productos-base.entity';

@Injectable()
export class ProductosBaseService {
  constructor(
    @InjectRepository(ProductoBase)
    private productosBaseRepository: Repository<ProductoBase>,
  ) {}

  async create(createProductosBaseDto: CreateProductosBaseDto) {
    const nuevoProducto = this.productosBaseRepository.create(createProductosBaseDto);
    return await this.productosBaseRepository.save(nuevoProducto);
  }

  async findAll() {
    return await this.productosBaseRepository.find();
  }

  async findOne(id: number) {
    const producto = await this.productosBaseRepository.findOne({ where: { id_producto: id } });
    if (!producto) throw new NotFoundException(`Producto base con ID ${id} no encontrado`);
    return producto;
  }

  async update(id: number, updateProductosBaseDto: UpdateProductosBaseDto) {
    const producto = await this.productosBaseRepository.preload({
      id_producto: id,
      ...updateProductosBaseDto,
    });
    if (!producto) throw new NotFoundException(`Producto base con ID ${id} no encontrado`);
    return await this.productosBaseRepository.save(producto);
  }

  async remove(id: number) {
    const result = await this.productosBaseRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Producto base con ID ${id} no encontrado`);
    return { message: `Producto base con ID ${id} eliminado correctamente` };
  }
}