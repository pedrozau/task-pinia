import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports:[
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn:'1000s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
})
export class AuthModule {}
