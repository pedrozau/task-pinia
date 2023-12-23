import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserDTO } from './DTO/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async  create({email,password}:UserDTO,avatar:any) {
        
         const  emailExist = await this.prisma.user.findFirst({
             where: {
                 email
            }
         })


        if(emailExist) {
         throw  new  HttpException('email already exit',HttpStatus.BAD_REQUEST)
        }
        

        const author = []


         const passwordHash = await hash(password,13)


         return await this.prisma.user.create({
            data: {
                email,
                password:passwordHash,
                avatar,
    

                
            }
         })

        
        

    }  


    async getUsers() {
        return await this.prisma.user.findMany()
    }


    async getById(id:string) {
       const idExist = await this.prisma.user.findFirst({
        where: { id}
       })
      
       if(!idExist) {

          throw new HttpException('id not found',HttpStatus.BAD_REQUEST)
       }


       return await this.prisma.user.findFirst({
        where: {
            id:idExist.id
        },
        select: {
            email:true,
            password:false,
            avatar:true,
            task: true
        }
       })

    }

  async  delete(id:string) {
          
    const idExist = await this.prisma.user.findFirst({
        where: { id}
       })
      
       if(!idExist) {

          throw new HttpException('id not found',HttpStatus.BAD_REQUEST)
       }

       return await this.prisma.user.delete({where: {id}})
          

    }


   async update({email,password}:UserDTO,avatar:any,id:string) {
        const idExist = await this.prisma.user.findFirst({
            where: { id}
           })
          
           if(!idExist) {
    
              throw new HttpException('id not found',HttpStatus.BAD_REQUEST)
           }
           

           if(email && password && avatar) {
             
             const user_update = await this.prisma.user.update({
                 data: {
                    email,
                    password,
                    avatar
                 },
                 where: {
                    id
                 }
             })

           }
          
           if(email) {
             
              const user_update = await this.prisma.user.update({
                 data: {
                    email,
                    avatar:idExist.avatar,
                    password:idExist.password,
                 },
                 where: {
                    id
                 }
              }) 

           }

           if(password) {

            const passwordHash = await hash(password,13)

            const user_update = await this.prisma.user.update({
                data: {
                   email:idExist.email,
                   avatar:idExist.avatar,
                   password:passwordHash,
                },
                where: {
                   id
                }
             }) 

          }
         

          if(avatar) {

            const user_update = await this.prisma.user.update({
                data: {
                   email:idExist.email,
                   avatar,
                   password:idExist.password,
                },
                where: {
                   id
                }
             }) 

          }
 
        
           }
           

           

          
         

          

          
            

          
    }


