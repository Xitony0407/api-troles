import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ToppingsModule } from './toppings/toppings.module';
import { SaboresModule } from './sabores/sabores.module';
import { ProductosBaseModule } from './productos-base/productos-base.module';
import { EstadosOrdenModule } from './estados-orden/estados-orden.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { DetalleOrdenModule } from './detalle-orden/detalle-orden.module';
import { DetalleToppingsModule } from './detalle-toppings/detalle-toppings.module';
import { CarritosModule } from './carritos/carritos.module';
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';
import { MetodosPagoModule } from './metodos-pago/metodos-pago.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  }),

MongooseModule.forRoot(process.env.MONGO_URI || ''),

    // 🍃 Conexión a MongoDB (Para carritos y logs)
    MongooseModule.forRoot(process.env.MONGO_URI || ''),

    ToppingsModule,

    SaboresModule,

    ProductosBaseModule,

    EstadosOrdenModule,

    OrdenesModule,

    DetalleOrdenModule,

    DetalleToppingsModule,

    CarritosModule,

    LogsModule,

    RolesModule,

    MetodosPagoModule,

    UsuariosModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
