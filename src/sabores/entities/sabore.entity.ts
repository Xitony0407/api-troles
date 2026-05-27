import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sabores')
export class Sabor {
  @PrimaryGeneratedColumn()
  id_sabor: number;

  // Aquí irán: "Mango chamoy", "Fresa", "Limón"
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  // Un switch para apagar el sabor en la web si un día no haces de ese sabor
  @Column({ type: 'boolean', default: true })
  disponible: boolean;
}