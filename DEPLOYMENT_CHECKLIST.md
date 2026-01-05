# 🚀 배포 체크리스트

## 배포 전 준비사항

### ✅ 1. 코드 준비
- [ ] 모든 변경사항 커밋 및 푸시
- [ ] 프로덕션 빌드 테스트 완료
- [ ] 환경 변수 템플릿 확인 (`backend/.env.production`)

### ✅ 2. 데이터베이스 (Neon PostgreSQL)
- [ ] Neon 계정 생성
- [ ] 프로젝트 생성
- [ ] 연결 정보 복사 (Host, Username, Password, Database)
- [ ] 로컬에서 연결 테스트

### ✅ 3. OAuth 설정
- [ ] Google Cloud Console에서 OAuth 클라이언트 생성
- [ ] Kakao Developers에서 앱 생성
- [ ] Naver Developers에서 앱 생성
- [ ] 각 플랫폼의 Client ID/Secret 복사

### ✅ 4. AWS S3 (파일 업로드용)
- [ ] S3 버킷 생성
- [ ] IAM 사용자 생성 및 권한 부여
- [ ] Access Key/Secret Key 복사

---

## 배포 순서

### 1️⃣ 백엔드 배포 (Render)

1. **Render 프로젝트 생성**
   - [ ] Render.com 회원가입
   - [ ] "New Web Service" 선택
   - [ ] GitHub 저장소 연결

2. **빌드 설정**
   ```
   Build Command: cd backend && npm install && npm run build
   Start Command: cd backend && npm run start:prod
   ```

3. **환경 변수 설정** (총 18개)
   - [ ] `NODE_ENV=production`
   - [ ] `PORT=3001`
   - [ ] `DATABASE_HOST` (Neon에서 복사)
   - [ ] `DATABASE_PORT=5432`
   - [ ] `DATABASE_USERNAME` (Neon에서 복사)
   - [ ] `DATABASE_PASSWORD` (Neon에서 복사)
   - [ ] `DATABASE_NAME` (Neon에서 복사)
   - [ ] `JWT_SECRET` (랜덤 문자열 생성)
   - [ ] `JWT_EXPIRES_IN=7d`
   - [ ] `FRONTEND_URL` (나중에 Vercel URL로 업데이트)
   - [ ] `GOOGLE_CLIENT_ID`
   - [ ] `GOOGLE_CLIENT_SECRET`
   - [ ] `GOOGLE_CALLBACK_URL` (Render URL + /auth/google/callback)
   - [ ] `KAKAO_CLIENT_ID`
   - [ ] `KAKAO_CALLBACK_URL` (Render URL + /auth/kakao/callback)
   - [ ] `NAVER_CLIENT_ID`
   - [ ] `NAVER_CLIENT_SECRET`
   - [ ] `NAVER_CALLBACK_URL` (Render URL + /auth/naver/callback)
   - [ ] `AWS_REGION=ap-northeast-2`
   - [ ] `AWS_ACCESS_KEY_ID`
   - [ ] `AWS_SECRET_ACCESS_KEY`
   - [ ] `AWS_S3_BUCKET_NAME`

4. **배포 및 확인**
   - [ ] "Create Web Service" 클릭
   - [ ] 배포 로그 확인 (5-10분 소요)
   - [ ] 배포 완료 후 URL 복사 (예: `https://cliakorea-backend.onrender.com`)
   - [ ] 헬스체크 확인: `https://your-backend.onrender.com/health`

### 2️⃣ 프론트엔드 배포 (Vercel)

1. **Vercel 프로젝트 생성**
   - [ ] Vercel.com 회원가입
   - [ ] "Add New Project" 선택
   - [ ] GitHub 저장소 연결

2. **빌드 설정**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   ```

3. **환경 변수 설정**
   - [ ] `NEXT_PUBLIC_API_URL` (Render 백엔드 URL)

4. **배포 및 확인**
   - [ ] "Deploy" 클릭
   - [ ] 배포 로그 확인 (3-5분 소요)
   - [ ] 배포 완료 후 URL 복사 (예: `https://your-app.vercel.app`)
   - [ ] 웹사이트 접속 확인

### 3️⃣ OAuth 콜백 URL 업데이트

1. **Google Cloud Console**
   - [ ] OAuth 2.0 클라이언트 ID 선택
   - [ ] 승인된 리디렉션 URI 추가: `https://your-backend.onrender.com/auth/google/callback`
   - [ ] 저장

2. **Kakao Developers**
   - [ ] 내 애플리케이션 선택
   - [ ] 카카오 로그인 → Redirect URI 추가: `https://your-backend.onrender.com/auth/kakao/callback`
   - [ ] 저장

3. **Naver Developers**
   - [ ] 내 애플리케이션 선택
   - [ ] API 설정 → Callback URL 수정: `https://your-backend.onrender.com/auth/naver/callback`
   - [ ] 저장

### 4️⃣ 최종 환경 변수 업데이트

1. **Render 백엔드**
   - [ ] `FRONTEND_URL` 업데이트: `https://your-app.vercel.app`
   - [ ] 서비스 재시작

2. **Vercel 프론트엔드**
   - [ ] `NEXT_PUBLIC_API_URL` 확인: `https://your-backend.onrender.com`
   - [ ] 재배포 (자동)

---

## 배포 후 테스트

### 기능 테스트
- [ ] 프론트엔드 접속 확인
- [ ] 백엔드 헬스체크 확인
- [ ] 회원가입 테스트
- [ ] 로그인 테스트
- [ ] Google 소셜 로그인 테스트
- [ ] Kakao 소셜 로그인 테스트
- [ ] Naver 소셜 로그인 테스트
- [ ] 프로필 조회 테스트
- [ ] 파일 업로드 테스트 (S3)

### 성능 테스트
- [ ] 페이지 로딩 속도 확인
- [ ] API 응답 시간 확인
- [ ] 이미지 로딩 확인

### 보안 테스트
- [ ] HTTPS 적용 확인
- [ ] CORS 설정 확인
- [ ] JWT 토큰 검증 확인

---

## 모니터링 설정 (선택사항)

### UptimeRobot (무료)
Render 슬립 모드 방지를 위한 핑 서비스

1. **UptimeRobot 설정**
   - [ ] UptimeRobot.com 회원가입
   - [ ] "Add New Monitor" 선택
   - [ ] Monitor Type: HTTP(s)
   - [ ] URL: `https://your-backend.onrender.com/health`
   - [ ] Monitoring Interval: 5분
   - [ ] 저장

2. **알림 설정**
   - [ ] 이메일 알림 활성화
   - [ ] 다운타임 발생 시 알림 받기

---

## 문제 해결

### 백엔드 배포 실패
- [ ] Render 로그 확인
- [ ] 빌드 명령어 확인
- [ ] 환경 변수 확인
- [ ] Node.js 버전 확인

### 프론트엔드 배포 실패
- [ ] Vercel 로그 확인
- [ ] Next.js 빌드 에러 확인
- [ ] 환경 변수 확인

### CORS 에러
- [ ] 백엔드 `FRONTEND_URL` 확인
- [ ] Vercel 도메인과 정확히 일치하는지 확인
- [ ] 프로토콜(https) 포함 확인

### 데이터베이스 연결 실패
- [ ] Neon 연결 정보 재확인
- [ ] 데이터베이스 활성 상태 확인
- [ ] SSL 설정 확인

### OAuth 로그인 실패
- [ ] 콜백 URL 정확히 일치하는지 확인
- [ ] Client ID/Secret 확인
- [ ] OAuth 앱 활성 상태 확인

---

## 다음 단계

- [ ] 커스텀 도메인 연결 (선택사항)
- [ ] SSL 인증서 확인
- [ ] 사용자 피드백 수집
- [ ] 성능 모니터링
- [ ] 필요시 Railway로 업그레이드

---

## 유용한 명령어

### JWT Secret 생성
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 로컬 프로덕션 빌드 테스트
```bash
# 백엔드
cd backend
npm run build
npm run start:prod

# 프론트엔드
cd frontend
npm run build
npm start
```

### 데이터베이스 마이그레이션
```bash
cd backend
npm run migration:run
```

---

## 비용 추적

| 서비스 | 무료 한도 | 현재 사용량 | 상태 |
|--------|-----------|-------------|------|
| Vercel | 100시간 빌드/월 | - | ✅ |
| Render | 750시간/월 | - | ✅ |
| Neon | 3GB 스토리지 | - | ✅ |
| AWS S3 | 5GB 스토리지 | - | ✅ |

---

## 지원

문제가 발생하면:
1. 📖 [DEPLOYMENT.md](./DEPLOYMENT.md) 참고
2. 🚂 [RAILWAY.md](./RAILWAY.md) 참고 (업그레이드 시)
3. 📝 GitHub Issues에 문의
4. 📧 이메일 문의
