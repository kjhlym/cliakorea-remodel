# Kakao Map API 설정 가이드

## 1. 카카오 개발자 계정 생성 및 앱 등록

1. [카카오 개발자 사이트](https://developers.kakao.com/) 접속
2. 로그인 후 "내 애플리케이션" 메뉴 선택
3. "애플리케이션 추가하기" 클릭
4. 앱 이름 입력 (예: "어린이리더십강사협회 웹사이트")
5. 앱 생성 완료

## 2. JavaScript 키 발급

1. 생성한 앱 선택
2. "앱 키" 탭에서 "JavaScript 키" 확인
3. JavaScript 키 복사

## 3. 플랫폼 등록

1. "플랫폼" 탭 선택
2. "Web 플랫폼 등록" 클릭
3. 사이트 도메인 등록:
   - 개발: `http://localhost:3000`
   - 프로덕션: 실제 도메인 (예: `https://cliakorea.kr`)

## 4. 환경 변수 설정

### 프론트엔드 (.env.local)

```bash
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_javascript_key_here
```

## 5. 코드 업데이트

`frontend/app/about/location/page.tsx` 파일에서:

```typescript
// 현재 코드 (61번 줄):
src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false"

// 다음과 같이 변경:
src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
```

## 6. 좌표 정확도 향상 (선택사항)

현재 사용 중인 좌표 (37.6541, 127.0621)는 대략적인 위치입니다.
더 정확한 좌표를 얻으려면:

1. [카카오맵](https://map.kakao.com/) 접속
2. "서울시 노원구 동일로 182길 47-23" 검색
3. 해당 위치 클릭
4. URL에서 좌표 확인 또는 우클릭 → "이 장소 URL 복사"
5. 코드의 좌표값 업데이트

## 7. 테스트

1. 개발 서버 재시작: `npm run dev`
2. `http://localhost:3000/about/location` 접속
3. 지도가 정상적으로 표시되는지 확인

## 참고사항

- 카카오맵 API는 무료로 사용 가능 (일일 호출 제한 있음)
- 프로덕션 배포 시 반드시 실제 도메인을 플랫폼에 등록해야 함
- API 키는 절대 공개 저장소에 커밋하지 말 것
