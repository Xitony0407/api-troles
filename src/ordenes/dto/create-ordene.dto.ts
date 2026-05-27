export class CreateOrdenDto {
  id_usuario: number;
  id_metodo: number;
  detalles: DetalleCarritoDto[];
}

export class DetalleCarritoDto {
  id_producto: number;
  id_sabor: number;
  toppings: number[];
}