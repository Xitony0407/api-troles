import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Carrito, CarritoDocument } from './entities/carrito.schema';

@Injectable()
export class CarritosService {
  constructor(
    @InjectModel(Carrito.name) private carritoModel: Model<CarritoDocument>,
  ) {}

  // Busca el carrito de un usuario, si no existe, lo crea
  async findOne(id_usuario: string) {
    let carrito = await this.carritoModel.findOne({ id_usuario });
    if (!carrito) {
      carrito = await this.carritoModel.create({ id_usuario, items: [], total_temporal: 0 });
    }
    return carrito;
  }

  // Agrega un producto al carrito y recalcula el total
  async addItem(id_usuario: string, item: any) {
    const carrito = await this.findOne(id_usuario);
    carrito.items.push(item);
    carrito.markModified('items'); // Marca explícitamente como modificado
    
    // Recalcular total (suponiendo que el item tiene precio)
    carrito.total_temporal = carrito.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
    
    return await carrito.save();
  }

  // Elimina un producto del carrito
  async removeItem(id_usuario: string, id_producto: string) {
    const carrito = await this.findOne(id_usuario);
    carrito.items = carrito.items.filter(item => item.id_producto !== id_producto);
    
    // Recalcular total
    carrito.total_temporal = carrito.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
    
    return await carrito.save();
  }
}
