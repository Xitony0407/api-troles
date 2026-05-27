import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('estados_orden')
export class EstadoOrden {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column({ type: 'varchar', length: 50 })
  descripcion: string; // "Pendiente", "Preparando", "Entregado"

  @OneToMany(() => Orden, (orden) => orden.estado)
  ordenes: Orden[];
}