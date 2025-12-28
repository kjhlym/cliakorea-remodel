import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../../entities/user.entity';
import axios from 'axios';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_CLIENT_ID'),
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET') || '', 
      callbackURL: configService.get<string>('KAKAO_CALLBACK_URL') || `${configService.get<string>('BACKEND_URL')}/auth/kakao/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    try {
      console.log('[KakaoStrategy] profile:', JSON.stringify(profile, null, 2));
      const { _json } = profile;
      const providerId = profile.id.toString();
      
      // 카카오 REST API를 사용하여 추가 사용자 정보 가져오기
      let kakaoUserInfo: any = null;
      try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            property_keys: '["kakao_account.profile", "kakao_account.email"]',
          },
        });
        kakaoUserInfo = response.data;
        console.log('[KakaoStrategy] Kakao API response:', JSON.stringify(kakaoUserInfo, null, 2));
      } catch (apiError) {
        console.error('[KakaoStrategy] Error fetching user info from Kakao API:', apiError);
        // API 호출 실패 시 기존 profile 정보 사용
      }
      
      // 카카오 계정 정보 확인 (API 응답 또는 기본 profile)
      const kakaoAccount = kakaoUserInfo?.kakao_account || _json.kakao_account || {};
      const properties = kakaoUserInfo?.properties || _json.properties || {};
      const profileInfo = kakaoAccount.profile || {};
      
      // 이메일 추출
      const email = kakaoAccount.email || `kakao_${providerId}@kakao.temp`;
      
      // 닉네임 추출 (우선순위: API 응답 > properties > profile > 기본값)
      const nickname = 
        profileInfo.nickname ||
        properties.nickname || 
        kakaoAccount.profile?.nickname || 
        profile.displayName || 
        profile.username || 
        `카카오 사용자 ${providerId.slice(-4)}`; // providerId 마지막 4자리로 구분
      
      // 프로필 이미지 추출
      const avatarUrl = 
        profileInfo.profile_image_url ||
        properties.profile_image || 
        kakaoAccount.profile?.profile_image_url || 
        null;

      const userProfile = {
        email: email,
        fullName: nickname,
        avatarUrl: avatarUrl,
        provider: AuthProvider.KAKAO,
        providerId: providerId,
      };

      console.log('[KakaoStrategy] userProfile for validation:', userProfile);
      const user = await this.authService.validateOAuthUser(userProfile);
      done(null, user);
    } catch (error) {
      console.error('[KakaoStrategy] Error in validate:', error);
      done(error, null);
    }
  }
}
