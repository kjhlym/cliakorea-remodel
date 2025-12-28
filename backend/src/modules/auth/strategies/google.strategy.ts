import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../../entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || configService.get<string>('GOOGLE_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || configService.get<string>('GOOGLE_SECRET') || configService.get<string>('GOOGLE_PW') || 'dummy',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || `${configService.get<string>('BACKEND_URL')}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      console.log('[GoogleStrategy] profile:', JSON.stringify(profile, null, 2));
      const { emails, displayName, photos, id } = profile;
      const userProfile = {
        email: emails && emails.length > 0 ? emails[0].value : null,
        fullName: displayName,
        avatarUrl: photos && photos.length > 0 ? photos[0].value : null,
        provider: AuthProvider.GOOGLE,
        providerId: id,
      };

      console.log('[GoogleStrategy] userProfile for validation:', userProfile);
      const user = await this.authService.validateOAuthUser(userProfile);
      done(null, user);
    } catch (error) {
      console.error('[GoogleStrategy] Error in validate:', error);
      done(error, null);
    }
  }
}
