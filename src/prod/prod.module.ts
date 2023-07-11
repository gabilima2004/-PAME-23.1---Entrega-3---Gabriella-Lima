import { Module } from '@nestjs/common';
import { ProdService } from './prod.service';
import { ProdController } from './prod.controller';
import { Prod } from './entities/prod.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Prod])], 
  controllers: [ProdController],
  providers: [ProdService]
})
export class ProdModule {}
