import { Controller, Get, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
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
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
    } catch (error) {
      console.error('[AuthController] Error in googleAuthRedirect:', error);
      const logPath = path.join(process.cwd(), 'auth_error.log');
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] CONTROLLER Error: ${error.message}\nStack: ${error.stack}\nUser: ${JSON.stringify(req.user)}\n\n`);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/login?error=auth_failed`);
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
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
    } catch (error) {
      console.error('[AuthController] Error in kakaoAuthRedirect:', error);
      const logPath = path.join(process.cwd(), 'auth_error.log');
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] KAKAO CONTROLLER Error: ${error.message}\nStack: ${error.stack}\nUser: ${JSON.stringify(req.user)}\n\n`);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/login?error=auth_failed&message=${encodeURIComponent(error.message)}`);
    }
  }

  // Naver Login
  // Admin 로그인 (ID/PW 방식)
  @Post('admin/login')
  async adminLogin(@Body() loginDto: { adminId: string; password: string }) {
    return this.authService.adminLogin(loginDto.adminId, loginDto.password);
  }

  // 현재 사용자 정보 확인 (Me)
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    console.log('[AuthController /auth/me] User from JWT:', req.user);
    return req.user;
  }

  // [개발용] 본인 계정을 어드민으로 승격
  @Get('promote-me')
  @UseGuards(AuthGuard('jwt'))
  async promoteMe(@Req() req) {
    return this.authService.promoteToAdmin(req.user.id);
  }

  // [개발용] 모든 계정을 어드민으로 승격 (인증 불필요 - 비상용)
  @Get('dev/force-admin')
  async forceAdmin() {
    return this.authService.forceAllAdmin();
  }
}
