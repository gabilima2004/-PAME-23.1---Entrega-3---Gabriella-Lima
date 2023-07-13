import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prod } from 'src/prod/entities/prod.entity';
import { CreateProdDto } from 'src/prod/dto/create-prod.dto';
import { UpdateProdDto } from 'src/prod/dto/update-prod.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>,
              @InjectRepository(Prod) private prodRepository:Repository<Prod>){}
  
  //Criando um novo usuário
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

    //Verificando se o usuário e o produto existem
    if (!user || !prod) {
      throw new HttpException('User or product not found', HttpStatus.BAD_REQUEST);
    }

    //Verificando se o usuário é um cliente
    if (!user.isAdmin) {
      throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
    }

    //Verificando se o produto existe no estoque
    if (prod.quantity === 0) {
      throw new HttpException('Product is out of stock', HttpStatus.BAD_REQUEST);
    }

    user.produtos.push(prod);
    prod.quantity--;

    await this.userRepository.save(user);
    await this.prodRepository.save(prod);
  }

  //Mostrar os clientes
  findAllClientes() {
    return this.userRepository.find({
      where: {
        isAdmin: false, 
      },
    });
  }
  
  //Mostrar os administradores
  findAllAdmin() {
    return this.userRepository.find({
      where: {
        isAdmin: true, 
      },
    });
  }

  //Mostrar os produtos de um cliente
  findAll() {
    return this.userRepository.find({relations: ['prods']});
  }

  //Mostrar um usuário pelo seu id
  findOne(id: number) {
    return this.userRepository.findOneBy({id})
  }

  //Atualizar os dados de um usuário
  update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update({id}, {...updateUserDto})
  }

  //Remover um usuário
  remove(id: number) {
    this.userRepository.delete({id});
  }

  //Função para criar um produto por um administrador
  async createProdByAdmin(id:number, createProdDto: CreateProdDto): Promise<Prod> {
    const user = await this.userRepository.findOneBy({id})
      
    //Verificando se o usuário é um administrador
    if (!user.isAdmin) {
      throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
    }
      
    //Verificando se é um usuário existente
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

  //Editando um produto por um administrador
  async updateProdByAdmin(id:number, prodId: number, updateProdDto: UpdateProdDto): Promise<Prod> {
    const user = await this.userRepository.findOneBy({id})
    const prod = await this.prodRepository.findOne({ where: { id: prodId }});
      
    //Verificando se o usuário é administrador
    if (!user.isAdmin) {
      throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
    }
      
    //Verificando se o produto existe
    if (!prod) {
      throw new NotFoundException('Product not found');
    }

    prod.name = updateProdDto.name;
    prod.price = updateProdDto.price;

    return this.prodRepository.save(prod);
  }

  //Deletando um produto por um administrador
  async deleteProdByAdmin(id:number, prodId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({id})
    const prod = await this.prodRepository.findOne({ where: { id: prodId }});

    //Verificando se o usuário é um administrador
    if (!user.isAdmin) {
      throw new HttpException('User is not an admin', HttpStatus.FORBIDDEN);
    }

    //Verificando se o produto existe
    if (!prod) {
      throw new NotFoundException('Product not found');
    }

    await this.prodRepository.remove(prod);
  }

}
