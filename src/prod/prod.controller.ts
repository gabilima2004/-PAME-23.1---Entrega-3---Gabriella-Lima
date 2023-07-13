import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdService } from './prod.service';
import { CreateProdDto } from './dto/create-prod.dto';
import { UpdateProdDto } from './dto/update-prod.dto';

@Controller('prod')
export class ProdController {
  constructor(private readonly prodService: ProdService) {}

  /* http://localhost:3000/prod */
  @Get()
  findAll() {
    return this.prodService.findAll();
  }

  /* http://localhost:3000/prod */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prodService.findOne(+id);
  }

}
