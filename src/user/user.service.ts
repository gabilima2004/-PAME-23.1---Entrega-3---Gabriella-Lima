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

  //Comprar um produto por um cliente
  async comprarProduto(userId: number, prodId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }});
    const prod = await this.prodRepository.findOne({ where: { id: prodId }});

    if (!user || !prod) {
      throw new HttpException('User or product not found', HttpStatus.BAD_REQUEST);
    }

    if (!user.isAdmin) {
      throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
    }

    if (prod.quantity === 0) {
      throw new HttpException('Product is out of stock', HttpStatus.BAD_REQUEST);
    }

    user.produtos.push(prod);
    prod.quantity--;

    await this.userRepository.save(user);
    await this.prodRepository.save(prod);
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
