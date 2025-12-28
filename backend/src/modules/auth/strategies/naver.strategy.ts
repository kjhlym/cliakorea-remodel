import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../../entities/user.entity';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('NAVER_CLIENT_ID') || 'dummy',
      clientSecret: configService.get<string>('NAVER_CLIENT_SECRET') || 'dummy',
      callbackURL: configService.get<string>('NAVER_CALLBACK_URL') || `${configService.get<string>('BACKEND_URL')}/auth/naver/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { email, name, profileImage, id } = profile;
    const userProfile = {
      email,
      fullName: name,
      avatarUrl: profileImage,
      provider: AuthProvider.NAVER,
      providerId: id,
    };

    const user = await this.authService.validateOAuthUser(userProfile);
    done(null, user);
  }
}
