import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prod } from 'src/prod/entities/prod.entity';
import { CreateProdDto } from 'src/prod/dto/create-prod.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>,
              @InjectRepository(Prod) private prodRepository:Repository<Prod>){}
  
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date()
    });
    this.userRepository.save(newUser);
  }

  async createProd(id:number, CreateProdDto: CreateProdDto){
    const user = await this.userRepository.findOneBy({id})
    if (!user)
      throw new HttpException(
        'User not found',
        HttpStatus.BAD_REQUEST,
      )
    const newProd = this.prodRepository.create({
      ...CreateProdDto,
      user
    })
    return this.prodRepository.save(newProd)
  }

  findAll() {
    return this.userRepository.find({relations: ['prods']});
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update({id}, {...updateUserDto})
  }

  remove(id: number) {
    this.userRepository.delete({id});
  }
}
