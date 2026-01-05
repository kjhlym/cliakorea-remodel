# Railway 배포 설정 (선택사항 - $5/월)

## Railway 장점
- ✅ 슬립 모드 없음 (24/7 운영)
- ✅ 더 빠른 응답 속도
- ✅ 더 많은 메모리 (512MB → 8GB)
- ✅ 월 $5로 시작 가능

## 배포 방법

### 1. Railway 프로젝트 생성
```bash
npm install -g @railway/cli
railway login
railway init
```

### 2. 환경 변수 설정
Railway 대시보드에서 다음 변수 추가:
```
NODE_ENV=production
PORT=3001
DATABASE_HOST=your-neon-host.neon.tech
DATABASE_PORT=5432
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_NAME=neondb
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=${{RAILWAY_PUBLIC_DOMAIN}}/auth/google/callback
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CALLBACK_URL=${{RAILWAY_PUBLIC_DOMAIN}}/auth/kakao/callback
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
NAVER_CALLBACK_URL=${{RAILWAY_PUBLIC_DOMAIN}}/auth/naver/callback
```

### 3. 배포
```bash
railway up
```

### 4. 도메인 확인
Railway 대시보드에서 생성된 도메인 확인 후 Vercel 환경 변수 업데이트:
```
NEXT_PUBLIC_API_URL=https://your-app.railway.app
```

## 비용 비교

| 플랫폼 | 무료 플랜 | 유료 플랜 | 슬립 모드 |
|--------|-----------|-----------|-----------|
| Render | 750시간/월 | $7/월 | ⚠️ 있음 |
| Railway | $5 크레딧 | $5/월~ | ✅ 없음 |
| Heroku | ❌ 없음 | $7/월 | - |

## 추천 시나리오

- **테스트/데모**: Render 무료 플랜
- **실제 서비스**: Railway $5/월
- **대규모 트래픽**: Railway $20/월 이상
