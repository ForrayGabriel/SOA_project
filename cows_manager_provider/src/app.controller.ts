import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Cow } from './cows/models/cow.entity';

@Controller()
export class AppController {
 
  constructor(private appService: AppService) {}

  @MessagePattern({ cmd: 'addCow' })
  async getMoney(name: string): Promise<Cow> {
    console.log('Adding a cow');
    const cow = new Cow();
    cow.name = name;
    cow.level = 1;
    cow.last_milked = new Date(0);
    return this.appService.create(cow);
  }

  @MessagePattern({ cmd: 'getAllCows' })
  async getAllCows(): Promise<Cow[]> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'addLevel' })
  async addLevel(id: number): Promise<any> {
    console.log('AddLevel a cow');
    const cow = await this.appService.findOne(id);
    cow.level = cow.level + 1;
    return this.appService.update(cow);
  }

  @MessagePattern({ cmd: 'milkCow' })
  async milkCow(id: number): Promise<number> {
    console.log('Milking a cow');
    const cow = await this.appService.findOne(id);
    cow.last_milked = new Date();
    this.appService.update(cow);
    return cow.level
  }

}
