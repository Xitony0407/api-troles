import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DetalleOrden } from '../../detalle-orden/entities/detalle-orden.entity';
import { Topping } from '../../toppings/entities/topping.entity';

@Entity('detalle_toppings')
export class DetalleTopping {
  @PrimaryGeneratedColumn()
  id_detalle_topping: number;

  @ManyToOne(() => DetalleOrden)
  @JoinColumn({ name: 'id_detalle' })
  detalleOrden: DetalleOrden;

  @ManyToOne(() => Topping)
  @JoinColumn({ name: 'id_topping' })
  topping: Topping;
}