# 어린이리더십강사협회 (CLIA) 웹사이트 리모델링

## 프로젝트 개요

10년 전 구축된 어린이리더십강사협회 웹사이트를 최신 기술 스택으로 리모델링한 프로젝트입니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **반응형**: 모바일 우선 설계

## 주요 기능

- ✅ 반응형 헤더 및 네비게이션
- ✅ 히어로 섹션
- ✅ 프로그램 카테고리 섹션
- ✅ 빠른 메뉴 (교육 신청, 온라인 상담)
- ✅ 푸터 (연락처, 소셜 미디어)

## 프로젝트 구조

```
cliakorea-remodel/
├── app/
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 페이지
│   └── globals.css     # 전역 스타일
├── components/
│   ├── Header.tsx       # 헤더 컴포넌트
│   ├── HeroSection.tsx # 히어로 섹션
│   ├── ProgramCategories.tsx # 프로그램 카테고리
│   ├── QuickMenu.tsx   # 빠른 메뉴
│   └── Footer.tsx      # 푸터 컴포넌트
└── public/             # 정적 파일
```

## 실행 방법

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 주요 개선 사항

1. **최신 기술 스택 적용**: Next.js 16 App Router 사용
2. **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
3. **성능 최적화**: Tailwind CSS v4로 최적화된 스타일링
4. **접근성 개선**: 시맨틱 HTML 및 ARIA 속성 적용
5. **타입 안정성**: TypeScript로 타입 안정성 확보

## 연락처

- 대표전화: 070-4384-7849
- 휴대전화: 010-5465-7745

## 라이선스

© 2025 어린이리더십강사협회 (CLIA). All rights reserved.
