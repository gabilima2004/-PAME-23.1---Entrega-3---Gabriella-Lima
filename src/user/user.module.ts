import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prod } from 'src/prod/entities/prod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Prod])], 
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
