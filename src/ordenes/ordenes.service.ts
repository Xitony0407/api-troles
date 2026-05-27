import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-ordene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';

import { DetalleOrden } from '../detalle-orden/entities/detalle-orden.entity';
import { DetalleTopping } from '../detalle-toppings/entities/detalle-topping.entity';
import { Topping } from '../toppings/entities/topping.entity';
import { Sabor } from '../sabores/entities/sabore.entity';
import { ProductoBase } from '../productos-base/entities/productos-base.entity';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private ordenesRepository: Repository<Orden>,

    @InjectRepository(DetalleOrden)
    private detalleOrdenRepository: Repository<DetalleOrden>,

    @InjectRepository(DetalleTopping)
    private detalleToppingRepository: Repository<DetalleTopping>,

    @InjectRepository(Topping)
    private toppingsRepository: Repository<Topping>,

    @InjectRepository(Sabor)
    private saboresRepository: Repository<Sabor>,

    @InjectRepository(ProductoBase)
    private productosBaseRepository: Repository<ProductoBase>,

    private logsService: LogsService,
  ) {}

  async create(createOrdenDto: CreateOrdenDto) {
    let granTotal = 0;

    // Si no se envía un id_usuario, asignamos el ID 1 por defecto (Usuario Invitado/Prueba)
    const idUsuario = createOrdenDto.id_usuario ?? 1;

    // 1. Creamos e insertamos la Orden Maestra enlazando Usuario, Estado y Pago
    const nuevaOrden = this.ordenesRepository.create({
      usuario: { id_usuario: idUsuario },
      estado: { id_estado: 1 }, // 1 = Pendiente 2 = En Proceso 3 = Listo para Entregar 4 = Entregado
      metodoPago: { id_metodo: createOrdenDto.id_metodo },
      total_pagar: 0,
    });
    const ordenGuardada = await this.ordenesRepository.save(nuevaOrden);

    // 2. Procesamos cada vaso (Trol) que viene en la petición
    for (const item of createOrdenDto.detalles) {
      // Validamos que el vaso base exista en el catálogo y obtenemos su precio original
      const producto = await this.productosBaseRepository.findOneBy({
        id_producto: item.id_producto,
      });
      if (!producto)
        throw new NotFoundException(
          `El producto base con ID ${item.id_producto} no existe`,
        );

      let precioVaso = Number(producto.precio_base); // Los $35.00 base

      // Validamos que el sabor base también exista
      const sabor = await this.saboresRepository.findOneBy({
        id_sabor: item.id_sabor,
      });
      if (!sabor)
        throw new NotFoundException(`El sabor con ID ${item.id_sabor} no existe`);

      // 3. Guardamos el renglón en la tabla detalle_orden
      const nuevoDetalle = this.detalleOrdenRepository.create({
        orden: ordenGuardada,
        producto: producto,
        sabor: sabor,
        subtotal: precioVaso, // Inicialmente el subtotal es el precio del vaso
      });
      const detalleGuardado = await this.detalleOrdenRepository.save(
        nuevoDetalle,
      );

      // 4. Procesamos los toppings elegidos para este vaso en específico
      let costoToppingsAcumulado = 0;
      for (const idTopping of item.toppings) {
        const topping = await this.toppingsRepository.findOneBy({
          id_topping: idTopping,
        });
        if (!topping)
          throw new NotFoundException(`El topping con ID ${idTopping} no existe`);

        // Sumamos el costo del topping (si son gomitas sumará $10.00, si es chamoy sumará $0.00)
        costoToppingsAcumulado += Number(topping.precio_extra);

        // Guardamos el registro en la tabla pivote detalle_toppings
        const nuevoDetalleTopping = this.detalleToppingRepository.create({
          detalleOrden: detalleGuardado,
          topping: topping,
        });
        await this.detalleToppingRepository.save(nuevoDetalleTopping);
      }

      // Actualizamos el subtotal real de este vaso (Precio Base + Toppings)
      detalleGuardado.subtotal = precioVaso + costoToppingsAcumulado;
      await this.detalleOrdenRepository.save(detalleGuardado);

      // Sumamos el costo de este vaso al total general del ticket
      granTotal += detalleGuardado.subtotal;
    }

    // 5. Finalmente, actualizamos la Orden Maestra con el gran total calculado de forma segura
    ordenGuardada.total_pagar = granTotal;
    const ordenFinal = await this.ordenesRepository.save(ordenGuardada);

    // 🔥 AUTOMATIZACIÓN DE LOG: Registramos el evento en MongoDB
    await this.logsService.create({
      accion: 'Crear Orden',
      detalles: {
        id_orden: ordenFinal.id_orden,
        id_usuario: idUsuario,
        total: granTotal,
        productos: createOrdenDto.detalles.length,
      },
    });

    return ordenFinal;
  }

  async findAll() {
  return await this.ordenesRepository.find({
    relations: ['estado', 'usuario', 'metodoPago'],
  });
  }

  async update(id: string, updateOrdenDto: any) {
    // Buscamos la orden existente por su ID (UUID)
    const orden = await this.ordenesRepository.findOneBy({ id_orden: id });
    if (!orden) throw new NotFoundException(`La orden con ID ${id} no existe`);

    if (updateOrdenDto.id_estado) {
      orden.estado = { id_estado: updateOrdenDto.id_estado } as any;
    }

    // Guardamos los cambios en PostgreSQL
    return await this.ordenesRepository.save(orden);
  }

  findOne(id: number) {
    return `This action returns a #${id} orden`;
  }

  remove(id: number) {
    return `This action removes a #${id} orden`;
  }
}
