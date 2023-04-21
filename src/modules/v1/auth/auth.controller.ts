import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { IResponseMessage } from 'src/common/constants/response';
import { Public } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { RequestLoginPasswordDto } from './dtos/request-login-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async userSignup(@Body() payload: CreateUserDto): Promise<IResponseMessage> {
    return await this.authService.createUser(payload);
  }

  @Public()
  @Post('login-password')
  async requestLoginPassword(@Body() payload: RequestLoginPasswordDto) {
    return await this.authService.requestLoginPassword(payload);
  }

  @Public()
  @Post('login')
  async login(@Body() payload: LoginDto): Promise<any> {
    return await this.authService.login(payload);
  }
}
