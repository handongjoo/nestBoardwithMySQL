import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: {email:string; password: string}) {
    return await this.userService.login(body.email, body.password)
  }

  @Post('register')
  async register(@Body() body: {email: string, name: string, password: string}) {
    return await this.userService.register(body.email, body.name, body.password)
  }
  
  }
