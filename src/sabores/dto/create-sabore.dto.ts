export class CreateSaborDto {
  nombre: string;
  disponible?: boolean; // El signo de interrogación lo hace opcional, si no lo mandan, por defecto será 'true'
}