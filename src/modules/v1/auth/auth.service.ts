import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IResponseMessage,
  ResponseMessage,
} from 'src/common/constants/response';
import { User } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { RequestLoginPasswordDto } from './dtos/request-login-password.dto';
import { AdminSignupDto } from './dtos/adminSignupDto';
import { AdminLoginDto } from './dtos/adminLoginDto';
import { Environment } from 'src/common/configs/environment';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(payload: CreateUserDto): Promise<IResponseMessage> {
    try {
      let user: User;
      user = await this.userService.findByEmail(payload.email);
      if (user) {
        return new ResponseMessage(
          false,
          null,
          'user with provided email already exist',
        );
      }

      user = await this.userService.findByMatricNo(payload.matricNo);
      if (user) {
        return new ResponseMessage(
          false,
          null,
          'user with provided matric no already exist',
        );
      }

      const newUser = await this.userService.createUser(payload);

      return new ResponseMessage(true, newUser, 'Registration Successful');
    } catch (err) {
      if (err) throw new InternalServerErrorException(err.message);
    }
  }

  async requestLoginPassword(payload: RequestLoginPasswordDto) {
    try {
      const { email, matricNo } = payload;
      const user = await this.userService.findByEmailAndMatricNo(
        email,
        matricNo,
      );

      if (!user) {
        return new ResponseMessage(false, null, 'Invalid Credentials');
      }

      // generate login password
      await this.userService.generateLoginPassword(user.email);

      return new ResponseMessage(
        true,
        null,
        'Login password sent to your email',
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async login(payload: LoginDto) {
    try {
      const { password } = payload;

      const user = await this.userService.findByLoginPassword(password);

      if (!user) {
        throw new BadRequestException('Invalid Login Password');
      }

      const currentDate = new Date();
      const expiresIn = new Date(user.loginPasswordExpiresIn);

      if (currentDate.getTime() > expiresIn.getTime()) {
        throw new BadRequestException('Login password expired');
      }

      await this.userService.deleteUserLoginPassword(user.id);

      const jwtPayload = { sub: user._id, role: user.role };

      return new ResponseMessage(
        true,
        {
          user,
          token: this.jwtService.sign(jwtPayload),
        },
        'Login Successful',
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async adminSignup(payload: AdminSignupDto) {
    try {
      const { email, password, confirmPassword, adminSecret } = payload;

      if (password !== confirmPassword) {
        return new ResponseMessage(
          false,
          null,
          'password and confirm password must match',
        );
      }

      if (adminSecret !== Environment.APP.ADMIN_SIGNUP_SECRET) {
        return new ResponseMessage(false, null, 'Invalid admin secret');
      }

      let user = await this.userService.findByEmail(email);

      if (user) {
        return new ResponseMessage(
          false,
          null,
          'user with provided email already exist',
        );
      }

      user = await this.userService.createAdmin({ ...payload, role: 'admin' });
      return new ResponseMessage(true, user, 'Admin Registration Successful');
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async adminLogin(payload: AdminLoginDto) {
    try {
      const { email, password } = payload;

      const user = await this.userService.getUserByEmailAndPassword(
        email,
        password,
      );

      const jwtPayload = { sub: user._id, role: user.role };

      return new ResponseMessage(
        true,
        {
          user,
          token: this.jwtService.sign(jwtPayload),
        },
        'Login Successful',
      );
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
