import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
//import { Ressource } from './ressources/models/ressource.entity';
import { AppService } from './app.service';
import { Ressource } from './ressources/models/ressource.entity';

@Controller()
export class AppController {
 
  constructor(private appService: AppService) {}

  @MessagePattern({ cmd: 'getMoney' })
  async getMoney(data: string): Promise<number> {
    console.log('Getting Money');
    let money = await (await this.appService.findAll()).filter((ressource) => ressource.name === 'Money');
    return money[0].value;
  }

  @MessagePattern({ cmd: 'changeMoney' })
  async addMoney(data: number): Promise<number> {
    console.log('Changing Money', data);
    let money = await (await this.appService.findAll()).filter((ressource) => ressource.name === 'Money')[0];
    // Transform string to int
    let changeAmount = parseInt(data.toString());
    if (money.value + changeAmount < 0) {
      return -1;
    } else {
      money.value = parseInt(money.value.toString()) + parseInt(data.toString());
      await this.appService.update(money);
      return money.value;
    }
  }

  @MessagePattern({ cmd: 'getMilk' })
  async getMilk(data: string): Promise<number> {
    console.log('Getting Milk');
    let milk = await (await this.appService.findAll()).filter((ressource) => ressource.name === 'Milk');
    return milk[0].value;
  }

  @MessagePattern({ cmd: 'changeMilk' })
  async addMilk(data: number): Promise<number> {
    console.log('Changing Milk', data);
    let milk = await (await this.appService.findAll()).filter((ressource) => ressource.name === 'Milk')[0];
    // Transform string to int
    milk.value = parseInt(milk.value.toString()) + parseInt(data.toString());
    await this.appService.update(milk);
    return milk.value;
  }

  @MessagePattern({ cmd: 'sellMilk' })
  async sellMilk(data: number): Promise<number> {
    console.log('Selling Milk', data);
    let milk = await (await this.appService.findAll()).filter((ressource) => ressource.name === 'Milk')[0];
    let money = await (await this.appService.findAll()).filter((ressource) => ressource.name === 'Money')[0];
    // Transform string to int
    money.value = money.value + milk.value*data;
    milk.value = 0;
    await this.appService.update(milk);
    await this.appService.update(money);
    return money.value;
  }

}
