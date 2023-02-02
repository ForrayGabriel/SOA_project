import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ressource } from './ressources/models/ressource.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class AppService {
  
  constructor(@InjectRepository(Ressource)
    private ressourceRepository: Repository<Ressource>) {
    }

    async  findAll(): Promise<Ressource[]> {
      return await this.ressourceRepository.find();
  }

  async  create(ressource: Ressource): Promise<Ressource> {
      return await this.ressourceRepository.save(ressource);
  }

  async update(ressource: Ressource): Promise<UpdateResult> {
      return await this.ressourceRepository.update(ressource.id, ressource);
  }

  async delete(id): Promise<DeleteResult> {
      return await this.ressourceRepository.delete(id);
  }
}
