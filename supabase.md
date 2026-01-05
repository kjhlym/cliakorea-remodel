# Supabase + Vercel 배포 가이드

## 🎯 개요

GitHub + Supabase + Vercel을 사용한 완전 무료 배포 방법입니다.

---

## 📋 준비물

- GitHub 계정
- Supabase 계정 (https://supabase.com)
- Vercel 계정 (https://vercel.com)

---

## 🚀 배포 순서

### 1단계: GitHub 저장소 준비 (2분)

1. 현재 프로젝트를 GitHub에 푸시
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. 저장소가 public 또는 private으로 설정되어 있는지 확인

---

### 2단계: Supabase 데이터베이스 설정 (10분)

#### 2.1 프로젝트 생성

1. https://supabase.com 접속 및 로그인
2. "New Project" 클릭
3. 설정:
   - Name: `cliakorea`
   - Database Password: 강력한 비밀번호 생성 (저장 필수!)
   - Region: `Northeast Asia (Seoul)` 또는 `Southeast Asia (Singapore)`
   - Pricing Plan: `Free`

4. "Create new project" 클릭 (약 2분 소요)

#### 2.2 데이터베이스 연결 정보 확인

1. 프로젝트 대시보드 → "Settings" → "Database"
2. "Connection string" 섹션에서 "URI" 복사
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

3. 개별 정보 확인:
   - Host: `db.xxxxx.supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: 생성 시 입력한 비밀번호

#### 2.3 데이터베이스 마이그레이션

**옵션 A: SQL Editor 사용 (추천)**

1. Supabase 대시보드 → "SQL Editor"
2. 로컬에서 스키마 생성:
   ```powershell
   cd backend
   npm run typeorm schema:log > schema.sql
   ```

3. `schema.sql` 내용을 SQL Editor에 붙여넣기
4. "Run" 클릭

**옵션 B: 로컬에서 마이그레이션**

1. `backend/.env` 파일 생성:
   ```env
   DATABASE_HOST=db.xxxxx.supabase.co
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your-password
   DATABASE_NAME=postgres
   ```

2. 마이그레이션 실행:
   ```powershell
   cd backend
   npm run migration:run
   ```

---

### 3단계: Vercel 백엔드 배포 (10분)

#### 3.1 프로젝트 생성

1. https://vercel.com 접속 및 로그인
2. "Add New..." → "Project"
3. GitHub 저장소 선택 및 Import

#### 3.2 백엔드 설정

1. 설정:
   - Project Name: `cliakorea-backend`
   - Framework Preset: `Other`
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. 환경 변수 추가 (Environment Variables):
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_HOST=db.xxxxx.supabase.co
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your-supabase-password
   DATABASE_NAME=postgres
   DATABASE_SSL=true
   JWT_SECRET=your-random-secret-key-min-32-chars
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://cliakorea.vercel.app
   
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=https://cliakorea-backend.vercel.app/auth/google/callback
   
   KAKAO_CLIENT_ID=your-kakao-client-id
   KAKAO_CLIENT_SECRET=your-kakao-client-secret
   KAKAO_CALLBACK_URL=https://cliakorea-backend.vercel.app/auth/kakao/callback
   
   NAVER_CLIENT_ID=your-naver-client-id
   NAVER_CLIENT_SECRET=your-naver-client-secret
   NAVER_CALLBACK_URL=https://cliakorea-backend.vercel.app/auth/naver/callback
   
   AWS_REGION=ap-northeast-2
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_S3_BUCKET=your-s3-bucket-name
   ```

3. "Deploy" 클릭

4. 배포 완료 후 URL 확인 (예: `https://cliakorea-backend.vercel.app`)

#### 3.3 Vercel 서버리스 함수 설정

`backend/vercel.json` 파일 생성:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/main.js"
    }
  ]
}
```

---

### 4단계: Vercel 프론트엔드 배포 (5분)

#### 4.1 프로젝트 생성

1. Vercel 대시보드에서 "Add New..." → "Project"
2. 같은 GitHub 저장소 선택

#### 4.2 프론트엔드 설정

1. 설정:
   - Project Name: `cliakorea`
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

2. 환경 변수 추가:
   ```
   NEXT_PUBLIC_API_URL=https://cliakorea-backend.vercel.app
   ```

3. "Deploy" 클릭

4. 배포 완료 후 URL 확인 (예: `https://cliakorea.vercel.app`)

---

### 5단계: OAuth 콜백 URL 업데이트 (5분)

배포된 백엔드 URL로 각 OAuth 제공자의 콜백 URL을 업데이트합니다.

#### Google Cloud Console

1. https://console.cloud.google.com
2. "APIs & Services" → "Credentials"
3. OAuth 2.0 클라이언트 ID 선택
4. "승인된 리디렉션 URI" 추가:
   ```
   https://cliakorea-backend.vercel.app/auth/google/callback
   ```

#### Kakao Developers

1. https://developers.kakao.com
2. 애플리케이션 선택
3. "제품 설정" → "카카오 로그인"
4. "Redirect URI" 추가:
   ```
   https://cliakorea-backend.vercel.app/auth/kakao/callback
   ```

#### Naver Developers

1. https://developers.naver.com
2. 애플리케이션 선택
3. "API 설정"
4. "Callback URL" 수정:
   ```
   https://cliakorea-backend.vercel.app/auth/naver/callback
   ```

---

### 6단계: CORS 및 최종 설정 (3분)

#### 6.1 백엔드 CORS 설정 확인

`backend/src/main.ts` 파일에서 CORS 설정 확인:
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

#### 6.2 Vercel 환경 변수 업데이트

백엔드 프로젝트의 `FRONTEND_URL` 환경 변수를 실제 프론트엔드 URL로 업데이트:
```
FRONTEND_URL=https://cliakorea.vercel.app
```

변경 후 "Redeploy" 클릭

---

## 🔄 자동 배포 설정

GitHub에 푸시할 때마다 자동으로 배포되도록 설정되어 있습니다.

### 브랜치별 배포

- `main` 브랜치: Production 배포
- `develop` 브랜치: Preview 배포 (선택사항)

### 배포 확인

1. GitHub에 코드 푸시
2. Vercel 대시보드에서 배포 상태 확인
3. 배포 로그에서 에러 확인

---

## 💾 Supabase 추가 기능 활용

### Storage (파일 저장소)

AWS S3 대신 Supabase Storage 사용 가능:

1. Supabase 대시보드 → "Storage"
2. "Create a new bucket" 클릭
3. Bucket name: `uploads`
4. Public bucket 체크 (공개 파일인 경우)

환경 변수 추가:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_BUCKET=uploads
```

### Authentication

Supabase Auth를 사용하여 OAuth 간소화 가능 (선택사항)

### Realtime

실시간 기능이 필요한 경우 Supabase Realtime 활용 가능

---

## 📊 모니터링

### Supabase 대시보드

- Database: 테이블, 쿼리 확인
- Logs: 데이터베이스 로그
- Reports: 사용량 통계

### Vercel 대시보드

- Deployments: 배포 히스토리
- Analytics: 트래픽 분석
- Logs: 런타임 로그

---

## 💰 비용

### 무료 플랜 제한

**Supabase Free Tier:**
- 500MB 데이터베이스
- 1GB 파일 저장소
- 2GB 대역폭/월
- 50,000 월간 활성 사용자

**Vercel Free Tier:**
- 100GB 대역폭/월
- 무제한 배포
- 서버리스 함수 실행 시간 제한

### 업그레이드 시점

- 데이터베이스 500MB 초과
- 월간 대역폭 초과
- 더 빠른 성능 필요

---

## 🔧 트러블슈팅

### 데이터베이스 연결 실패

1. Supabase 프로젝트가 활성화되어 있는지 확인
2. 비밀번호가 정확한지 확인
3. SSL 연결 설정 확인 (`DATABASE_SSL=true`)

### 배포 실패

1. Vercel 로그 확인
2. 빌드 명령어 확인
3. 환경 변수 누락 확인

### OAuth 로그인 실패

1. 콜백 URL이 정확한지 확인
2. 클라이언트 ID/Secret 확인
3. CORS 설정 확인

---

## 🚀 성능 최적화

### 데이터베이스

1. 인덱스 추가
2. 쿼리 최적화
3. Connection pooling 설정

### Vercel

1. Edge Functions 활용
2. ISR (Incremental Static Regeneration) 설정
3. 이미지 최적화

---

## 📚 참고 자료

- [Supabase 문서](https://supabase.com/docs)
- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [NestJS 배포 가이드](https://docs.nestjs.com/deployment)

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] GitHub 저장소 생성 및 푸시
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 마이그레이션 완료
- [ ] Vercel 백엔드 배포
- [ ] Vercel 프론트엔드 배포
- [ ] 모든 환경 변수 설정
- [ ] OAuth 콜백 URL 업데이트
- [ ] CORS 설정 확인
- [ ] 로그인 기능 테스트
- [ ] 주요 기능 동작 확인
