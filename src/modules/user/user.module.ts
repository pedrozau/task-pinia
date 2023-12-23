import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[MulterModule.register({
    dest:'./uploads'
  })],
  controllers: [UserController],
  providers: [UserService,PrismaService],
})
export class UserModule {}
