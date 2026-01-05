# 어린이리더십강사협회 배포 가이드

## 📋 배포 전략 개요

### 🆓 1단계: 완전 무료 배포 (테스트/데모용)
- **프론트엔드**: Vercel (무료) - Next.js 최적화, 자동 배포
- **백엔드**: Render (무료) - 월 750시간 무료
- **데이터베이스**: Neon PostgreSQL (무료) - 3GB 스토리지
- **총 비용**: $0/월

### 💰 2단계: 저렴한 확장 ($5-10/월)
- Railway로 백엔드 업그레이드 시 더 안정적인 성능

---

## 🚀 1단계: 무료 배포 가이드

### 1️⃣ Neon PostgreSQL 데이터베이스 설정

1. [Neon](https://neon.tech) 회원가입
2. 새 프로젝트 생성
3. 데이터베이스 연결 정보 복사:
   ```
   Host: xxx.neon.tech
   Database: neondb
   Username: xxx
   Password: xxx
   Port: 5432
   ```

### 2️⃣ Render 백엔드 배포

1. [Render](https://render.com) 회원가입
2. "New +" → "Web Service" 선택
3. GitHub 저장소 연결
4. 설정:
   - **Name**: cliakorea-backend
   - **Region**: Singapore (가장 가까운 지역)
   - **Branch**: main
   - **Root Directory**: (비워두기)
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
   - **Plan**: Free

5. 환경 변수 설정 (Environment Variables):
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
   ```

6. "Create Web Service" 클릭
7. 배포 완료 후 URL 복사 (예: `https://cliakorea-backend.onrender.com`)

### 3️⃣ Vercel 프론트엔드 배포

1. [Vercel](https://vercel.com) 회원가입
2. "Add New..." → "Project" 선택
3. GitHub 저장소 연결
4. 설정:
   - **Framework Preset**: Next.js
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. 환경 변수 설정:
   ```
   NEXT_PUBLIC_API_URL=https://cliakorea-backend.onrender.com
   ```

6. "Deploy" 클릭
7. 배포 완료 후 URL 복사 (예: `https://your-app.vercel.app`)

### 4️⃣ OAuth 콜백 URL 설정

배포 완료 후 각 OAuth 제공자의 콜백 URL을 업데이트하세요:

**Google Cloud Console**:
- 승인된 리디렉션 URI: `https://cliakorea-backend.onrender.com/auth/google/callback`

**Kakao Developers**:
- Redirect URI: `https://cliakorea-backend.onrender.com/auth/kakao/callback`

**Naver Developers**:
- Callback URL: `https://cliakorea-backend.onrender.com/auth/naver/callback`

### 5️⃣ Render 환경 변수 업데이트

Render 대시보드에서 다음 환경 변수를 업데이트:
```
FRONTEND_URL=https://your-app.vercel.app
GOOGLE_CALLBACK_URL=https://cliakorea-backend.onrender.com/auth/google/callback
KAKAO_CALLBACK_URL=https://cliakorea-backend.onrender.com/auth/kakao/callback
NAVER_CALLBACK_URL=https://cliakorea-backend.onrender.com/auth/naver/callback
```

---

## 🔧 2단계: Railway 업그레이드 (선택사항)

Render 무료 플랜의 제약사항 (15분 비활성 후 슬립 모드)이 불편하다면:

1. [Railway](https://railway.app) 회원가입
2. GitHub 저장소 연결
3. "New Project" → "Deploy from GitHub repo"
4. 설정:
   - **Root Directory**: backend
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Port**: 3001

5. 환경 변수 동일하게 설정
6. 월 $5 플랜으로 24/7 운영 가능

---

## 📊 무료 플랜 제약사항

### Vercel (프론트엔드)
- ✅ 무제한 대역폭
- ✅ 자동 SSL
- ✅ 글로벌 CDN
- ⚠️ 빌드 시간: 월 100시간

### Render (백엔드)
- ✅ 월 750시간 무료 (31일 기준 744시간)
- ⚠️ 15분 비활성 시 슬립 모드 (첫 요청 시 30초 지연)
- ⚠️ 월 100GB 대역폭

### Neon (데이터베이스)
- ✅ 3GB 스토리지
- ✅ 무제한 쿼리
- ⚠️ 7일 비활성 시 일시 중지

---

## 🔍 배포 확인

1. **프론트엔드**: `https://your-app.vercel.app` 접속
2. **백엔드 헬스체크**: `https://cliakorea-backend.onrender.com/health`
3. **API 테스트**: 로그인 기능 테스트

---

## 🐛 문제 해결

### Render 슬립 모드 해결
- [UptimeRobot](https://uptimerobot.com) 무료 모니터링 설정 (5분마다 핑)
- 또는 Railway로 업그레이드

### CORS 에러
- Render 환경 변수에서 `FRONTEND_URL` 확인
- Vercel 도메인과 정확히 일치하는지 확인

### 데이터베이스 연결 실패
- Neon 연결 정보 재확인
- SSL 모드 확인 (Neon은 기본적으로 SSL 필요)

---

## 📝 다음 단계

1. ✅ 무료 배포 완료
2. 🧪 테스트 및 버그 수정
3. 📈 사용자 피드백 수집
4. 💰 필요시 Railway로 업그레이드
5. 🚀 커스텀 도메인 연결

---

## 💡 팁

- **자동 배포**: GitHub에 푸시하면 Vercel과 Render가 자동으로 재배포
- **환경 변수 관리**: 각 플랫폼의 대시보드에서 쉽게 수정 가능
- **로그 확인**: Render와 Vercel 대시보드에서 실시간 로그 확인
- **비용 모니터링**: 무료 플랜 한도를 대시보드에서 추적

---

## 📞 지원

문제가 발생하면:
1. Render/Vercel 로그 확인
2. 환경 변수 재확인
3. GitHub Issues에 문의
