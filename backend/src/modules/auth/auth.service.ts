import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateOAuthUser(profile: any): Promise<User> {
    try {
      console.log('[AuthService] validateOAuthUser profile:', profile);
      const { email, fullName, avatarUrl, provider, providerId } = profile;

      // provider와 providerId로 먼저 사용자 찾기
      let user = await this.userRepository.findOne({
        where: { provider, providerId },
      });

      if (!user) {
        // 이메일이 실제 이메일인 경우에만 이메일로 검색 (임시 이메일 제외)
        if (email && !email.includes('@kakao.temp') && !email.includes('@naver.temp') && !email.includes('@google.temp')) {
          user = await this.userRepository.findOne({ where: { email } });

          if (user) {
            console.log('[AuthService] Existing user found by email, updating provider info');
            user.provider = provider;
            user.providerId = providerId;
            if (avatarUrl) user.avatarUrl = avatarUrl;
            await this.userRepository.save(user);
          }
        }

        // 여전히 사용자를 찾지 못한 경우 새로 생성
        if (!user) {
          console.log('[AuthService] New user, creating...');
          user = this.userRepository.create({
            email: email || `${provider}_${providerId}@${provider}.temp`,
            fullName,
            avatarUrl,
            provider,
            providerId,
            role: UserRole.USER,
          });
          await this.userRepository.save(user);
        }
      } else {
        // 기존 사용자 정보 업데이트
        if (avatarUrl && avatarUrl !== user.avatarUrl) {
          user.avatarUrl = avatarUrl;
        }
        if (fullName && fullName !== user.fullName) {
          user.fullName = fullName;
        }
        await this.userRepository.save(user);
      }

      return user;
    } catch (error) {
      console.error('[AuthService] Error in validateOAuthUser:', error);
      const logPath = path.join(process.cwd(), 'auth_error.log');
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] Error: ${error.message}\nStack: ${error.stack}\nProfile: ${JSON.stringify(profile)}\n\n`);
      throw error;
    }
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    };
  }
}
