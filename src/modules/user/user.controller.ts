import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './DTO/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { AuthGuard } from '../auth/auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

   @Post()
   @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: './files',
        filename: (req, file,callback) => {
           const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1e9)
           const ext = extname(file.originalname) 
           const filename = `${file.originalname}-${uniqueSuffix}${ext}` 

           callback(null,filename)
        }
      })
   }))
   create(@UploadedFile() file: Express.Multer.File,@Body() {email,password}:UserDTO) {
       return this.userService.create({email,password},file.filename)
   }
   
   @Get()
   @UseGuards(AuthGuard)
   getUsers() {
     return this.userService.getUsers() 
   }
   
   @Get(':id')
   @UseGuards(AuthGuard)
   getId(@Param('id') id:string) {
      return this.userService.getById(id)
   }
   
   @Delete(':id')
   @UseGuards(AuthGuard)
   delete(@Param('id') id: string) {
      return this.userService.delete(id) 
   }
   
   @Put(':id')
   @UseGuards(AuthGuard)
   @UseInterceptors(FileInterceptor('file',{
      storage: diskStorage({
        destination: './files',
        filename: (req, file,callback) => {
           const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1e9)
           const ext = extname(file.originalname) 
           const filename = `${file.originalname}-${uniqueSuffix}${ext}` 

           callback(null,filename)
        }
      })
   }))
   update(@UploadedFile() file: Express.Multer.File,@Body() {email,password}:UserDTO,@Param('id') id:string) {
        return this.userService.update({email,password},file.fieldname,id)
   }

   

}
