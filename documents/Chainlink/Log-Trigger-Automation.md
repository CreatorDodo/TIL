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

## 3. Log Trigger Upkeep 생성 (Chainlink Automation)

배포가 끝났다면 Chainlink Automation 앱에서 **이벤트 발생 시 counter를 올리는 Upkeep**을 등록한다.

### 3.1 트리거 설정

1. **Register new Upkeep** 선택
2. Trigger mechanism: **Log trigger** 선택
3. **Contract to automate**: LogTrigger 컨트랙트 주소 입력
4. **Contract emitting logs**: EventEmitter 컨트랙트 주소 입력
5. **Emitted log**: `WantsToCount` 이벤트 선택
6. Log index topic filters는 **비워 두기** → **Next**

### 3.2 Upkeep 상세 정보

| 항목                    | 설명                                               |
| ----------------------- | -------------------------------------------------- |
| **Upkeep name**         | 대시보드에 보일 이름 (예: "LogTrigger Counter")    |
| **Admin Address**       | Upkeep 관리 주소 (기본값: 연결된 지갑)             |
| **Gas limit**           | Upkeep 함수 실행에 허용할 최대 가스 (기본 500,000) |
| **Starting balance**    | Automation 비용용 LINK 잔액 (예: 5 LINK)           |
| **Project information** | 선택 사항, 비워 둬도 됨                            |

**Register Upkeep** 클릭 후 등록 트랜잭션 제출 → 확인 후 **소유권 검증 메시지 서명**. 이 시점에 Automation 생성 완료.

### 3.3 동작 확인

- **View Upkeep**으로 이전 레슨과 같이 Upkeep 상세 확인
- Remix **Deploy & run transactions**에서 EventEmitter의 **emitCountLog** 호출
- 트랜잭션 완료 후 Automation 대시보드 **History**에 해당 Upkeep 실행 기록 표시
- LogTrigger 컨트랙트의 **counted** 값을 다시 확인하면 **1 증가**한 것을 확인 가능

---

## 요약

- **EventEmitter**: `WantsToCount` 이벤트 emit → Log Trigger의 입력
- **LogTrigger**: `checkLog` / `performUpkeep` 구현, counter 증가 및 트리거한 주소 로그
- **Chainlink Automation**: Log trigger로 Upkeep 등록 → 이벤트 발생 시 자동으로 `performUpkeep` 실행

이 구성을 통해 **로그 트리거 기반**으로 컨트랙트 함수 실행을 자동화할 수 있다.
