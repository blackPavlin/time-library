import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    return this.authService.login(createUserDto.login, createUserDto.password);
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto.login, createUserDto.password);
  }
}
