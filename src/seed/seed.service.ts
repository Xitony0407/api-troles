import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../roles/entities/role.entity';
import { Sabor } from '../sabores/entities/sabore.entity';
import { ProductoBase } from '../productos-base/entities/productos-base.entity';
import { Topping } from '../toppings/entities/topping.entity';
import { MetodoPago } from '../metodos-pago/entities/metodos-pago.entity';
import { EstadoOrden } from '../estados-orden/entities/estados-orden.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
    @InjectRepository(Sabor) private saboresRepository: Repository<Sabor>,
    @InjectRepository(ProductoBase) private productosBaseRepository: Repository<ProductoBase>,
    @InjectRepository(Topping) private toppingsRepository: Repository<Topping>,
    @InjectRepository(MetodoPago) private metodosPagoRepository: Repository<MetodoPago>,
    @InjectRepository(EstadoOrden) private estadosOrdenRepository: Repository<EstadoOrden>,
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
  ) {}

  async runSeed() {
    // 1. Roles
    const roles = await this.rolesRepository.save([{ nombre: 'Cliente' }, { nombre: 'Admin' }]);
    const rolCliente = roles.find(r => r.nombre === 'Cliente');

    // 2. Usuario de prueba
    await this.usuariosRepository.save({
      nombre: 'Usuario Prueba',
      correo: 'test@test.com',
      contrasena: '123456',
      rol: rolCliente,
    });

    // 3. Sabores
    await this.saboresRepository.save([
      { nombre: 'Limón', disponible: true },
      { nombre: 'Mango', disponible: true },
      { nombre: 'Fresa', disponible: true },
    ]);

    // 4. Productos Base
    await this.productosBaseRepository.save([
      { nombre: 'Trol Clásico', precio_base: 35.00 },
      { nombre: 'Trol Grande', precio_base: 50.00 },
    ]);

    // 5. Toppings
    await this.toppingsRepository.save([
      { nombre: 'Panditas', precio_extra: 10.00, porcion_gramos: 40 },
      { nombre: 'Chamoy', precio_extra: 0.00, porcion_gramos: 20 },
    ]);

    // 6. Métodos de Pago
    await this.metodosPagoRepository.save([
      { nombre: 'Efectivo' },
      { nombre: 'Tarjeta' },
    ]);

    // 7. Estados de Orden
    await this.estadosOrdenRepository.save([
      { descripcion: 'Pendiente' },
      { descripcion: 'En Proceso' },
      { descripcion: 'Listo' },
    ]);

    return { message: 'Base de datos poblada exitosamente (Incluye usuario de prueba ID 1)' };
  }
}

