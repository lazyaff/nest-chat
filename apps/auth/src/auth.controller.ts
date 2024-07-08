import { Controller, Post, Res, UseGuards, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { UsersService } from './users/users.service';
import { CreateUserRequest } from './users/dto/create-user.request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() request: CreateUserRequest) {
    const user = await this.usersService.createUser(request);
    return {
      statusCode: 201,
      message: 'Registration success',
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send({
      statusCode: 200,
      message: 'Logged in successfully',
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.send({
      statusCode: 200,
      message: 'Logged out successfully',
    });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
