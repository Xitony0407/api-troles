import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('metodos_pago')
export class MetodoPago {
  @PrimaryGeneratedColumn()
  id_metodo: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string; // "Efectivo", "Tarjeta", "Transferencia"

  @OneToMany(() => Orden, (orden) => orden.metodoPago)
  ordenes: Orden[];
}