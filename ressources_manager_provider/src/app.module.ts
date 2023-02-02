import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RessourcesModule } from './ressources/ressources.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ressource } from './ressources/models/ressource.entity';

@Module({
  imports: [RessourcesModule,
    TypeOrmModule.forRoot({
    type: "sqlite",
    database: "ressources.db",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }),TypeOrmModule.forFeature([Ressource])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
