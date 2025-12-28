# 어린이리더십강사협회 (CLIA) 웹사이트 리모델링

## 프로젝트 개요

10년 전 구축된 어린이리더십강사협회 웹사이트를 최신 기술 스택으로 리모델링한 프로젝트입니다.

## 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **반응형**: 모바일 우선 설계

### 백엔드
- **프레임워크**: NestJS
- **데이터베이스**: PostgreSQL
- **ORM**: TypeORM
- **언어**: TypeScript

## 프로젝트 구조

```
cliakorea-remodel/
├── frontend/              # Next.js 프론트엔드
│   ├── app/
│   ├── components/
│   └── public/
├── backend/               # NestJS 백엔드
│   ├── src/
│   │   ├── config/
│   │   ├── entities/
│   │   ├── modules/
│   │   └── ...
│   └── migrations/
└── README.md
```

## 설치 및 실행

### 1. 프론트엔드 설정

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

### 2. 백엔드 설정

```bash
cd backend
npm install
cp .env.example .env
# .env 파일에 데이터베이스 정보 입력
npm run start:dev
```

백엔드는 `http://localhost:3001`에서 실행됩니다.

### 3. 데이터베이스 설정

PostgreSQL 데이터베이스를 생성하고 백엔드 `.env` 파일에 연결 정보를 입력하세요.

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=cliakorea
```

## 주요 기능

### 프론트엔드
- ✅ 반응형 헤더 및 네비게이션
- ✅ 히어로 섹션
- ✅ 프로그램 카테고리 섹션
- ✅ 빠른 메뉴 (교육 신청, 온라인 상담)
- ✅ 푸터 (연락처, 소셜 미디어)

### 백엔드 API
- ✅ 게시판 API (CRUD)
- ✅ 교육 신청 API
- ✅ 온라인 상담 API
- ✅ 사용자 관리 (엔티티 준비됨)

## API 엔드포인트

### 게시판
- `GET /api/boards` - 게시글 목록
- `GET /api/boards/:id` - 게시글 상세
- `POST /api/boards` - 게시글 생성
- `PUT /api/boards/:id` - 게시글 수정
- `DELETE /api/boards/:id` - 게시글 삭제

### 교육 신청
- `GET /api/applications` - 신청 목록
- `POST /api/applications` - 신청 생성
- `PUT /api/applications/:id/status` - 상태 변경

### 온라인 상담
- `GET /api/consultations` - 상담 목록
- `POST /api/consultations` - 상담 생성
- `PUT /api/consultations/:id/reply` - 답변 작성

## 데이터베이스 엔티티

- **User**: 사용자 정보
- **Board**: 게시판 (공지사항, 뉴스, 교육 정보)
- **Application**: 교육 신청
- **Consultation**: 온라인 상담

## 개발 가이드

### 백엔드 마이그레이션

```bash
cd backend
npm run migration:generate -- -n MigrationName
npm run migration:run
```

### 환경 변수

프론트엔드와 백엔드 모두 `.env` 파일을 사용합니다. `.env.example` 파일을 참고하세요.

## 연락처

- 대표전화: 070-4384-7849
- 휴대전화: 010-5465-7745

## 라이선스

© 2025 어린이리더십강사협회 (CLIA). All rights reserved.
