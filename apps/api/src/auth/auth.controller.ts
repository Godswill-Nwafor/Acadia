import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role?: Role;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Initiates Google OAuth — Passport handles the redirect
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(
    @Req() req: { user: { access_token: string } },
    @Res() res: { redirect: (url: string) => void },
  ) {
    const token = req.user.access_token;
    const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:3000';
    res.redirect(`${clientUrl}/auth/callback?token=${token}`);
  }
}
