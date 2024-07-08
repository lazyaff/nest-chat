import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'usernameOrEmail' });
  }

  async validate(usernameOrEmail: string, password: string) {
    const isEmail = usernameOrEmail.includes('@');

    if (isEmail) {
      return this.usersService.validateUserByEmail(usernameOrEmail, password);
    } else {
      return this.usersService.validateUserByUsername(
        usernameOrEmail,
        password,
      );
    }
  }
}
