import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ILoggedInUser, LoggedInUser, Roles } from 'src/common/decorators';
import { CreateCandidateDto } from '../candidate/dtos/create-candidate.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@LoggedInUser() user: ILoggedInUser) {
    return await this.userService.getProfile(user.userId);
  }

  @Roles('admin')
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
