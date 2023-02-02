import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CowsModule } from './cows/cows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cow } from './cows/models/cow.entity';

@Module({
  imports: [CowsModule,
    TypeOrmModule.forRoot({
    type: "sqlite",
    database: "cows.db",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }),TypeOrmModule.forFeature([Cow]),
  HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
