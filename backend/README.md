# 어린이리더십강사협회 백엔드 API

## 기술 스택

- **프레임워크**: NestJS
- **데이터베이스**: PostgreSQL
- **ORM**: TypeORM
- **언어**: TypeScript

## 프로젝트 구조

```
backend/
├── src/
│   ├── config/           # 설정 파일
│   │   └── database.config.ts
│   ├── entities/         # TypeORM 엔티티
│   │   ├── user.entity.ts
│   │   ├── board.entity.ts
│   │   ├── application.entity.ts
│   │   └── consultation.entity.ts
│   ├── modules/          # 기능 모듈
│   │   ├── board/
│   │   ├── application/
│   │   └── consultation/
│   ├── app.module.ts     # 루트 모듈
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts           # 진입점
├── migrations/           # 마이그레이션 파일
└── .env.example          # 환경 변수 예시
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 값을 설정하세요.

```bash
cp .env.example .env
```

### 3. 데이터베이스 설정

PostgreSQL 데이터베이스를 생성하고 `.env` 파일에 연결 정보를 입력하세요.

### 4. 개발 서버 실행

```bash
npm run start:dev
```

서버는 `http://localhost:3001`에서 실행됩니다.

## API 엔드포인트

### 게시판 (Boards)

- `GET /api/boards` - 게시글 목록 조회
- `GET /api/boards/:id` - 게시글 상세 조회
- `POST /api/boards` - 게시글 생성
- `PUT /api/boards/:id` - 게시글 수정
- `DELETE /api/boards/:id` - 게시글 삭제

### 교육 신청 (Applications)

- `GET /api/applications` - 교육 신청 목록 조회
- `GET /api/applications/:id` - 교육 신청 상세 조회
- `POST /api/applications` - 교육 신청 생성
- `PUT /api/applications/:id/status` - 교육 신청 상태 변경
- `DELETE /api/applications/:id` - 교육 신청 삭제

### 온라인 상담 (Consultations)

- `GET /api/consultations` - 상담 목록 조회
- `GET /api/consultations/:id` - 상담 상세 조회
- `POST /api/consultations` - 상담 생성
- `PUT /api/consultations/:id/reply` - 상담 답변 작성
- `PUT /api/consultations/:id/status` - 상담 상태 변경
- `DELETE /api/consultations/:id` - 상담 삭제

## 데이터베이스 엔티티

### User (사용자)
- 사용자 정보 및 인증 정보 저장

### Board (게시판)
- 공지사항, 뉴스, 교육 정보 등 게시글 저장

### Application (교육 신청)
- 교육 프로그램 신청 정보 저장

### Consultation (온라인 상담)
- 온라인 상담 요청 및 답변 저장

## 개발 가이드

### 마이그레이션 생성

```bash
npm run migration:generate -- -n MigrationName
```

### 마이그레이션 실행

```bash
npm run migration:run
```

### 마이그레이션 되돌리기

```bash
npm run migration:revert
```

