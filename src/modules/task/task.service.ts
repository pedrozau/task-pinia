import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TaskDTO } from './DTO/task.dto';

@Injectable()
export class TaskService {


    constructor(private prisma: PrismaService) {}

    async create(data:TaskDTO) {
           
         return await this.prisma.task.create({
             data
         })

    }


    async getById(id:string) {
        const checkId = await this.prisma.task.findFirst({
             where: {
                id
             }
        })

        if(!checkId) {

             throw new HttpException('task not found',HttpStatus.BAD_REQUEST)
        }


        return await this.prisma.task.findFirst({
            where:{
                id:checkId.id
            }
        })

    }

    async update(data: TaskDTO, id: string) {
        const checkId = await this.prisma.task.findFirst({
            where: {
               id
            }
       })

       if(!checkId) {

            throw new HttpException('task not found',HttpStatus.BAD_REQUEST)
       }

       return await this.prisma.task.update({
         data,
         where: {
            id:checkId.id
         }
       })

    }
  

    async deleteById(id:string) {
        
        const checkId = await this.prisma.task.findFirst({
            where: {
               id
            }
       })

       if(!checkId) {

            throw new HttpException('task not found',HttpStatus.BAD_REQUEST)
       }


       return await this.prisma.task.delete({
        where: {
            id:checkId.id
        }
       })
           
    }

    async getTasks() {
        return await this.prisma.task.findMany()
    }
    

}
