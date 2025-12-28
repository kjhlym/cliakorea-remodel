# 카카오 로그인 설정 가이드

## 카카오 개발자 콘솔 설정

### 1. 카카오 개발자 콘솔 접속
- https://developers.kakao.com 접속
- 내 애플리케이션 > 애플리케이션 추가하기

### 2. 플랫폼 설정
- **Web 플랫폼 등록**
  - 사이트 도메인: `http://localhost:3001` (개발용)
  - 사이트 도메인: 실제 도메인 (프로덕션용)

### 3. 카카오 로그인 활성화
- 제품 설정 > 카카오 로그인 > 활성화 설정: ON

### 4. Redirect URI 등록
- Redirect URI: `http://localhost:3001/api/auth/kakao/callback` (개발용)
- Redirect URI: 실제 도메인 + `/api/auth/kakao/callback` (프로덕션용)

### 5. 동의항목 설정 (중요!)
- 제품 설정 > 카카오 로그인 > 동의항목
- **필수 동의항목**:
  - 닉네임 (필수)
  - 프로필 사진 (선택)
  - 카카오계정(이메일) (선택, 권장)

### 6. REST API 키 확인
- 앱 설정 > 앱 키
- REST API 키를 `.env` 파일의 `KAKAO_CLIENT_ID`에 입력
- Client Secret을 `.env` 파일의 `KAKAO_CLIENT_SECRET`에 입력

## 환경 변수 설정

`.env` 파일에 다음 설정이 필요합니다:

```env
KAKAO_CLIENT_ID=your_rest_api_key
KAKAO_CLIENT_SECRET=your_client_secret
KAKAO_CALLBACK_URL=http://localhost:3001/api/auth/kakao/callback
FRONTEND_URL=http://localhost:3000
```

## 테스트 방법

1. 백엔드 서버 재시작
2. 프론트엔드에서 카카오 로그인 버튼 클릭
3. 카카오 로그인 화면에서 동의항목 확인
4. 로그인 후 사용자 정보 확인

## 문제 해결

### "미연동 계정"이 표시되는 경우
- 카카오 개발자 콘솔에서 동의항목 설정 확인
- 닉네임 동의항목이 필수로 설정되어 있는지 확인
- 사용자가 카카오 로그인 시 동의항목에 동의했는지 확인

### 이메일이 없는 경우
- 카카오계정(이메일) 동의항목을 선택으로 설정
- 사용자가 이메일 제공에 동의해야 함
- 동의하지 않으면 임시 이메일(`kakao_{id}@kakao.temp`) 사용
