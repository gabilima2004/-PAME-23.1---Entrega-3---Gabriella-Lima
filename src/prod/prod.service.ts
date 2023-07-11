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

    async createProdByAdmin(id:number, createProdDto: CreateProdDto): Promise<Prod> {
      const user = await this.userRepository.findOneBy({id})
      
      if (!user.isAdmin) {
        throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
      }

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

    async updateProdByAdmin(id:number, prodId: number, updateProdDto: UpdateProdDto): Promise<Prod> {
      const user = await this.userRepository.findOneBy({id})
      const prod = await this.prodRepository.findOne({ where: { id: prodId }});

      if (!user.isAdmin) {
        throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
      }

      if (!prod) {
        throw new NotFoundException('Product not found');
      }

      prod.name = updateProdDto.name;
      prod.price = updateProdDto.price;


      return this.prodRepository.save(prod);
    }

    async deleteProdByAdmin(id:number, prodId: number): Promise<void> {
      const user = await this.userRepository.findOneBy({id})
      const prod = await this.prodRepository.findOne({ where: { id: prodId }});

      if (!user.isAdmin) {
        throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
      }

      if (!prod) {
        throw new NotFoundException('Product not found');
      }

      await this.prodRepository.remove(prod);
    }

  findAll() {
    return `This action returns all prod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prod`;
  }

}
