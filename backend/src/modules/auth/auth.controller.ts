import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Google Login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      console.log('[AuthController] googleAuthRedirect user:', req.user);
      const { accessToken, user } = await this.authService.login(req.user);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
    } catch (error) {
      console.error('[AuthController] Error in googleAuthRedirect:', error);
      const logPath = path.join(process.cwd(), 'auth_error.log');
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] CONTROLLER Error: ${error.message}\nStack: ${error.stack}\nUser: ${JSON.stringify(req.user)}\n\n`);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }

  // Kakao Login
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      console.log('[AuthController] kakaoAuthRedirect user:', req.user);
      if (!req.user) {
        throw new Error('User not found in request');
      }
      const { accessToken } = await this.authService.login(req.user);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
    } catch (error) {
      console.error('[AuthController] Error in kakaoAuthRedirect:', error);
      const logPath = path.join(process.cwd(), 'auth_error.log');
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] KAKAO CONTROLLER Error: ${error.message}\nStack: ${error.stack}\nUser: ${JSON.stringify(req.user)}\n\n`);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed&message=${encodeURIComponent(error.message)}`);
    }
  }

  // Naver Login
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth() {}

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req.user);
    return res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
  }

  // 현재 사용자 정보 확인 (Me)
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    console.log('[AuthController /auth/me] User from JWT:', req.user);
    return req.user;
  }
}
