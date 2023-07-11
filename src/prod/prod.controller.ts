import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdService } from './prod.service';
import { CreateProdDto } from './dto/create-prod.dto';
import { UpdateProdDto } from './dto/update-prod.dto';

@Controller('prod')
export class ProdController {
  constructor(private readonly prodService: ProdService) {}


  @Post('admin')
  createProdByAdmin(@Body() createProdDto: CreateProdDto) {
    return this.prodService.createProdByAdmin(createProdDto);
  }

  @Get()
  findAll() {
    return this.prodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prodService.findOne(+id);
  }

  @Patch('admin/:id')
  updateProdByAdmin(@Param('id') id: string, @Body() updateProdDto: UpdateProdDto) {
    return this.prodService.updateProdByAdmin(+id, updateProdDto);
  }

  @Delete('admin/:id')
  removeProdByAdmin(@Param('id') id: string) {
    return this.prodService.removeProdByAdmin(+id);
  }

}
