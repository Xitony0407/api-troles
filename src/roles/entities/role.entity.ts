import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  id_role: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string; // "Admin", "Cliente"

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}