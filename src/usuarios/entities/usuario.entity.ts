import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Rol } from '../../roles/entities/role.entity';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  // NUEVA COLUMNA: Contraseña en texto plano
  @Column({ type: 'varchar', length: 255 })
  contrasena: string;

  // Relación con Roles
  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_role' })
  rol: Rol;

  // NUEVA RELACIÓN: Un usuario puede generar muchas órdenes
  @OneToMany(() => Orden, (orden) => orden.usuario)
  ordenes: Orden[];
}