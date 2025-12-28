# Google Maps API 설정 가이드

## 1. Google Cloud Platform (GCP) 프로젝트 설정

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **결제 계정 연결** (Google Maps Platform 사용을 위해 필수)

## 2. API 활성화

"API 및 서비스" > "라이브러리" 메뉴에서 다음 API를 검색하여 활성화합니다:

1. **Maps JavaScript API** (웹사이트 지도 표시용)

## 3. API 키 생성

1. "API 및 서비스" > "사용자 인증 정보" 메뉴 선택
2. "+ 사용자 인증 정보 만들기" > "API 키" 선택
3. 생성된 API 키 복사

## 4. API 키 제한 설정 (보안 권장사항)

생성된 API 키의 세부 정보 페이지에서:

1. **애플리케이션 제한사항**:
   - "HTTP 리퍼러(웹사이트)" 선택
   - 개발 환경: `http://localhost:3000/*`
   - 운영 환경: `https://cliakorea.kr/*` (실제 도메인)

2. **API 제한사항**:
   - "키 제한" 선택
   - "Maps JavaScript API"만 체크

## 5. 환경 변수 설정

### 프론트엔드 (.env.local)

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 6. 테스트

1. `.env.local` 파일 저장
2. 개발 서버 재시작: `npm run dev`
3. `http://localhost:3000/about/location` 접속
4. "구글맵" 탭 선택하여 지도 확인

## 참고사항

- 구글맵은 매월 $200의 무료 사용 크레딧을 제공합니다.
- 단순 지도 표시의 경우 무료 크레딧 범위 내에서 충분히 운영 가능합니다.
- 결제 계정이 등록되어 있어야 API가 동작합니다.
