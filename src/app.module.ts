import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './database/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';



@Module({
  imports: [
    TaskModule,
     UserModule,MulterModule.register({
     dest: './uploads'
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
