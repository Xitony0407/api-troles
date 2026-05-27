export class CreateUsuarioDto {
  nombre: string;
  correo: string;
  contrasena: string; // <-- Agregamos el campo aquí
  rol: { id_role: number };
}