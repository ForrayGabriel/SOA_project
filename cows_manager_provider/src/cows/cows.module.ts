import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cow } from './models/cow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cow]),
  ],
  providers: [],
  controllers: []
})
export class CowsModule {}
