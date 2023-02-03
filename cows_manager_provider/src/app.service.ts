import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult  } from 'typeorm';
import { Cow } from './cows/models/cow.entity';

@Injectable()
export class AppService {
  
  constructor(@InjectRepository(Cow) private cowRepository: Repository<Cow>, private httpService: HttpService) {
    }

  async  findAll(): Promise<Cow[]> {
      return await this.cowRepository.find();
  }

  async findOne(id): Promise<Cow> {
      return await this.cowRepository.findOne(id);
  }

  async  create(cow: Cow): Promise<Cow> {
      return await this.cowRepository.save(cow);
  }

  async update(cow: Cow): Promise<UpdateResult> {
      return await this.cowRepository.update(cow.id, cow);
  }

  async delete(id): Promise<DeleteResult> {
      return await this.cowRepository.delete(id);
  }

  async addMilk(milkAmount: number) {
    const response = await this.httpService.post('http://localhost:3000/milk', {amount: milkAmount}).toPromise();
  }
}
