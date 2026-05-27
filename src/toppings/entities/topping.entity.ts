import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('toppings')
export class Topping {
  @PrimaryGeneratedColumn()
  id_topping: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string; // "Panditas", "Chamoy"

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  precio_extra: number; // 10.00 o 0.00

  @Column({ type: 'int', default: 40 })
  porcion_gramos: number;
}