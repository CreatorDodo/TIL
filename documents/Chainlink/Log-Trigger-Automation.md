# Chainlink Log Trigger Automation

Log Trigger는 Chainlink Automation에서 **온체인 이벤트(로그)**에 반응해 스마트 컨트랙트 함수를 자동 실행하는 방식이다. 특정 이벤트가 emit되면 Automation이 이를 감지하고 대상 컨트랙트의 지정 함수를 호출한다.

이번 레슨에서는 **두 개의 컨트랙트**로 로그 트리거 자동화를 구성한다.

| 컨트랙트         | 역할                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| **EventEmitter** | 특정 함수 호출 시 `WantsToCount` 이벤트를 emit → Automation 트리거 신호 |
| **LogTrigger**   | Automation이 호출하는 함수로 **호출 횟수(counter)** 를 기록             |

→ **이벤트 기반 자동화(event-driven automation)** 패턴을 보여준다.

---

## 1. EventEmitter 컨트랙트 배포 및 검증

### 1.1 컨트랙트 생성

- Remix **Automation** 워크스페이스 → `contracts` 폴더 안에 `log-trigger` 폴더 생성
- `EventEmitter.sol` 파일 추가
- `emitCountLog` 호출 시 `WantsToCount` 이벤트를 emit하는 단순 컨트랙트 작성 (강의 코드 저장소 코드 사용)

### 1.2 배포

- 이전 레슨과 동일한 절차로 **Sepolia**에 배포
- 배포된 컨트랙트 인스턴스를 워크스페이스에 **pin** 해두기
- `emitCountLog` 호출 후 트랜잭션 확인 시 `WantsToCount` 이벤트가 emit됨

### 1.3 Etherscan 검증

- 이전 레슨과 동일한 절차로 Etherscan에 **Verify and Publish**
- Contract 탭 옆에 **녹색 체크** 표시 확인
- **Events** 탭에서 `emitCountLog` 호출로 발생한 로그 확인

---

## 2. LogTrigger 컨트랙트 배포 및 검증

### 2.1 컨트랙트 요구사항

`log-trigger` 폴더에 `LogTrigger.sol` 생성. 다음을 만족해야 한다.

- **ILogAutomation** 인터페이스 상속 (Log Trigger Automation 호환)
- 구현할 함수 두 개:
  1. **checkLog**
     - Automation이 “할 일이 있는지” 시뮬레이션할 때 호출
     - `performData`를 반환 → 이후 `performUpkeep`에 전달
     - 여기서는 **이벤트를 보낸 주소(caller)**를 `performData`에 넣어, 나중에 로그로 남김
  2. **performUpkeep**
     - Automation이 실제 업킵을 수행할 때 실행
     - `performData`를 사용해 **counter 증가** + **누가 이벤트를 트리거했는지** 로그로 emit

강의 코드 저장소의 코드를 복사해 `LogTrigger.sol`에 붙여넣기.

### 2.2 배포

- Sepolia에 배포 (이전 레슨과 동일), 배포된 인스턴스 **pin**
- Remix에서 `counted` 값을 확인하면 **0**으로 나옴

### 2.3 Etherscan 검증

- **파일을 flatten**한 뒤, 해당 코드로 검증 진행

---
