import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ressource } from './models/ressource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ressource]),
  ],
  providers: [],
  controllers: []
})
export class RessourcesModule {}
