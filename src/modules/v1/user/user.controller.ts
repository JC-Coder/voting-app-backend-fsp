import { Controller, Get, UseGuards } from '@nestjs/common';
import { ILoggedInUser, LoggedInUser } from 'src/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get user profile
  @Get('profile')
  async getProfile(@LoggedInUser() user: ILoggedInUser) {
    return await this.userService.getProfile(user.userId);
  }
}
