import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProdDto } from 'src/prod/dto/create-prod.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* http://localhost:3000/user/{id}/prod */
  @Post(':id/prod')
  createUserProd(@Param('id') id: string, @Body() CreateProdDto: CreateProdDto){
    return this.userService.createProd(CreateProdDto)
  }

  /* http://localhost:3000/user */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /* http://localhost:3000/user/{id}/comprar/{id} */
  @Post(':userId/comprar/:prodId')
  comprarProduto(
    @Param('userId') userId: number,
    @Param('prodId') prodId: number,
  ) {
    return this.userService.comprarProduto(userId, prodId);
  }

  /* http://localhost:3000/user */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /* http://localhost:3000/user/{id} */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /* http://localhost:3000/user{id} */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /* http://localhost:3000/user{id} */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
