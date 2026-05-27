import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoOrden } from '../../estados-orden/entities/estados-orden.entity';
import { MetodoPago } from '../../metodos-pago/entities/metodos-pago.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn('uuid')
  id_orden: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  total_pagar: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  // Relación con Estados
  @ManyToOne(() => EstadoOrden, (estado) => estado.ordenes)
  @JoinColumn({ name: 'id_estado' })
  estado: EstadoOrden;

  // Relación con Métodos de Pago
  @ManyToOne(() => MetodoPago, (metodo) => metodo.ordenes)
  @JoinColumn({ name: 'id_metodo' })
  metodoPago: MetodoPago;

  // NUEVA RELACIÓN ENLAZADA: Muchas órdenes pertenecen a un usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.ordenes)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}