import { Controller, Get, Post, Put, Inject, Body,UseGuards, HttpService, HttpException, HttpStatus} from '@nestjs/common';
import { Cow_manager, Ressources_manager } from './my.constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { first } from 'rxjs/operators';

@UseGuards(JwtAuthGuard)
@Controller()
export class My_Controller {
  constructor(@Inject(Cow_manager) private readonly cow_client: ClientProxy, @Inject(Ressources_manager) private readonly ressource_client: ClientProxy, private httpService: HttpService) {}
  
  @Post('buyCow')
  async buyCow(@Body() body: {name: String}): Promise<Observable<number>> {
    const get_pattern = { cmd: 'getAllCows' };
    const add_pattern = { cmd: 'addCow' };
    const money_pattern = { cmd: 'changeMoney' };
    
    let Cows = await this.cow_client.send<any>(get_pattern, "").pipe(first()).toPromise();
    console.log('Cows', Cows.length);
    let money_amount = await this.ressource_client.send<number>(money_pattern, -Cows.length*1000).pipe(first()).toPromise();

    if(money_amount != -1){
      console.log('Buying Cow', body.name)
      return this.cow_client.send<number>(add_pattern, body.name);
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('getCows')
  getCows(): Observable<any> {
    const pattern = { cmd: 'getAllCows' };
    const data = "";
    return this.cow_client.send<any>(pattern, data);
  }

  @Put('addLevel')
  addLevel(@Body() body: {id: number}): Observable<any> {
    const pattern = { cmd: 'addLevel' };
    const data = body.id;
    return this.cow_client.send<any>(pattern, data);
  }

  @Put('milkCow')
  async milkCow(@Body() body: {id: number}): Promise<Observable<any>> {
    const pattern = { cmd: 'milkCow' };
    const data = body.id;
    let cow_level = await this.cow_client.send<any>(pattern, data).pipe(first()).toPromise();
    const pattern_milk = { cmd: 'changeMilk' };
    return this.ressource_client.send<number>(pattern_milk, (cow_level**1.5 )* 10);
  }

  @Get('money')
  getMoney(): Observable<number> {
    const pattern = { cmd: 'getMoney' };
    const data = "";
    return this.ressource_client.send<number>(pattern, data);
  }

  @Put('money')
  async postMoney(@Body() body: {amount: number}): Promise<number> {
    const pattern = { cmd: 'changeMoney' };
    const data = body.amount;

    let money_amount = await this.ressource_client.send<number>(pattern, data).pipe(first()).toPromise();

    if(money_amount != -1){
      return money_amount;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Get('milk')
  getMilk(): Observable<number> {
    const pattern = { cmd: 'getMilk' };
    const data = "";
    return this.ressource_client.send<number>(pattern, data);
  }

  @Put('milk')
  putMilk(@Body() body: {amount: number}): Observable<number> {
    const pattern = { cmd: 'changeMilk' };
    const data = body.amount;
    return this.ressource_client.send<number>(pattern, data);
  }

  @Get('sellMilk')
  sellMilk(): Observable<number> {
    const sell_pattern = { cmd: 'sellMilk' };
    const data = 10;
    return this.ressource_client.send<number>(sell_pattern, data);
  }

}

