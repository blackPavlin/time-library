import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(
    login: string,
    password: string,
  ): Promise<{ token: string }> {
    const user = await this.userService.getUser(login);
    if (!user) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    const isCorrect = bcrypt.compareSync(password, user.password);
    if (!isCorrect) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    return {
      token: this.jwtService.sign({ user_id: user._id }),
    };
  }

  public async signup(login: string, password: string): Promise<void> {
    const user = await this.userService.getUser(login);
    if (user) {
      throw new BadRequestException('');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await this.userService.createUser({ login, password: hash });
  }
}
