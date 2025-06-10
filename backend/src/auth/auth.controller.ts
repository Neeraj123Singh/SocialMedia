import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { address: string; signature: string }) {
    return this.authService.login(loginDto);
  }

  @Post('verify')
  async verify(@Body() verifyDto: { token: string }) {
    return this.authService.verifyToken(verifyDto.token);
  }
} 