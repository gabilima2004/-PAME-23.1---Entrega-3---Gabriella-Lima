import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from 'sqlite3';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db',
    entities: [],
    synchronize:true,
    autoLoadEntities:true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
