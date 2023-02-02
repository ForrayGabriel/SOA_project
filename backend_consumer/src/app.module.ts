import { Module, HttpModule } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Cow_manager, Ressources_manager } from './my.constants';
//import { HttpModule } from '@nestjs/axios';
import { My_Controller } from './app.controller';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    CoreModule,
    AuthModule,
    UserModule,
    ClientsModule.register([{ name: Ressources_manager, transport: Transport.TCP,
      options: { host: 'localhost', port: 5001 } }]),
    ClientsModule.register([{ name: Cow_manager, transport: Transport.TCP,
    options: { host: 'localhost', port: 5002 } }]),
    //HttpModule,
    HttpModule],
  controllers: [My_Controller],
})
export class AppModule {}
