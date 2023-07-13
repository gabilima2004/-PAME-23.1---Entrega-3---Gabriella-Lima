import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdDto } from './dto/create-prod.dto';
import { UpdateProdDto } from './dto/update-prod.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { Prod } from './entities/prod.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProdService {

  constructor(@InjectRepository(Prod) private prodRepository: Repository<Prod>,
              @InjectRepository(User) private userRepository:Repository<User>) {}

  //Mostrar todos os produtos
  findAll() {
    return this.prodRepository.find;
  }

  //Mostrar um produto por id
  findOne(id: number) {
    return this.prodRepository.findOneBy({id});
  }

}
