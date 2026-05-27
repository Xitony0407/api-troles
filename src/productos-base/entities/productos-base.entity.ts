import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('productos_base')
export class ProductoBase {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string; // "Trol Clásico"

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  precio_base: number; // 35.00
}