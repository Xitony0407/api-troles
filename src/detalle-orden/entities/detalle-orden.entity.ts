import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';
import { ProductoBase } from '../../productos-base/entities/productos-base.entity';
import { Sabor } from '../../sabores/entities/sabore.entity';

@Entity('detalle_orden')
export class DetalleOrden {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Orden)
  @JoinColumn({ name: 'id_orden' })
  orden: Orden;

  @ManyToOne(() => ProductoBase)
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoBase;

  @ManyToOne(() => Sabor)
  @JoinColumn({ name: 'id_sabor' })
  sabor: Sabor;
}