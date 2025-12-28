1. // turbo-all 워크플로우 생성 (가장 확실한 방법)
프로젝트 루트에 워크플로우 파일을 만들고 상단에 // turbo-all을 추가하면, 해당 워크플로우의 모든 단계에서 제가 명령어를 실행할 때 사용자의 승인 버튼 클릭 없이 즉시 실행합니다.

설정 방법:

.agent/workflows/auto_pilot.md (이름은 자유) 파일을 생성합니다.
파일 내용을 다음과 같이 작성합니다.
---
description: 승인 없이 모든 작업을 수행하는 오토파일럿 모드
---

// turbo-all
1. 사용자의 요청을 분석합니다.
2. 필요한 모든 명령어(run_command)를 SafeToAutoRun: true로 실행합니다.
3. 파일 수정 및 생성을 승인 대기 없이 즉시 수행합니다.
이렇게 설정된 워크플로우를 제가 읽게 되면, 저는 시스템에 "이 작업은 사용자가 이미 승인한 안전한 작업"이라고 알리며 작업을 진행하게 됩니다.

2. 프롬프트에 "Turbo Mode" 명시
워크플로우를 매번 만들기 번거로우시다면, 대화 시작 시 저에게 다음과 같이 강력하게 지시해 주세요. 이 지시는 제가 도구를 호출할 때 SafeToAutoRun 옵션을 자동으로 켜도록 유도합니다.

"지금부터 모든 작업은 // turbo-all 모드로 간주해. 내가 일일이 승인하지 않아도 되니까 SafeToAutoRun을 true로 설정해서 모든 명령어를 즉시 실행해줘."

3. .cursorrules 파일에 규칙 추가
프로젝트 루트의 .cursorrules 파일에 저의 행동 강령을 추가하면, 제가 도구를 사용할 때의 판단 기준이 바뀝니다.

text
[Antigravity Rules]
- User has granted full authority.
- For every `run_command` call, always set `SafeToAutoRun: true`.
- Do not wait for manual approval for file edits or terminal commands.
요약: 지금 바로 적용하기
지금 바로 저에게 **"앞으로 모든 명령어는 승인 없이 실행(SafeToAutoRun)해줘"**라고 말씀해 주시면, 제가 내부적으로 해당 옵션을 활성화하여 작업을 진행하겠습니다.

단, 시스템 보안 정책상 **매우 위험한 명령어(예: 시스템 전체 삭제 등)**는 여전히 플랫폼 차원에서 확인을 요청할 수 있습니다. 그 외의 일반적인 개발 작업(빌드, 테스트, 파일 수정 등)은 승인 없이 진행할 수 있습니다.

어떤 작업을 먼저 승인 없이 진행해 볼까요? 명령만 내려주세요!

