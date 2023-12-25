import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthDTO } from './auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

   constructor(
    private prisma:PrismaService,
    private jwtSerice: JwtService
    ) {}

   async signIn({email,password}:AuthDTO) {
     
      const emailExist = await this.prisma.user.findFirst({
        where: {
            email
        }
      })

      if(!emailExist) {
          
          throw new HttpException('email or password incorrect',HttpStatus.BAD_REQUEST)
      }


      const verify = await compare(password,emailExist.password)

      if(!verify) {
         
        throw new HttpException('email or password incorrect',HttpStatus.BAD_REQUEST)
      }

      const payload = {sub: emailExist.id, useremail: emailExist.email}  

      return {
        access_token: await this.jwtSerice.signAsync(payload),
         id: emailExist.id 
      }


   }

}
