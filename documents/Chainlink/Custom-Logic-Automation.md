# Chainlink Custom Logic Automation

Custom logic upkeeps를 사용하면 스마트 컨트랙트 내부에 특수 조건을 정의하여 **정확히 언제 upkeep이 실행되어야 하는지** 결정할 수 있다. 단순한 트리거 메커니즘과 달리, custom logic은 함수 실행 시점을 완전히 제어할 수 있게 해준다.

## 개요

- **Custom Logic vs 표준 트리거**: 표준 time-based upkeep과 달리, 컨트랙트 내부에서 조건을 직접 평가
- **핵심 메커니즘**: `checkUpkeep` 함수가 `true`를 반환하면 `performUpkeep`이 실행됨
- **유연성**: 시간 외에도 온체인 조건이나 조건의 조합 등 Solidity로 표현 가능한 모든 조건 사용 가능

---

## Custom Logic Automation 개념

### AutomationCompatibleInterface

컨트랙트가 custom logic automation과 호환되려면 `AutomationCompatibleInterface`를 상속하고 다음 두 함수를 구현해야 한다.

| 함수            | 역할                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| `checkUpkeep`   | upkeep 실행 준비 여부를 판단하는 로직. 준비되면 `true`, 아니면 `false` 반환 |
| `performUpkeep` | Automation이 실행하는 upkeep 함수. 실제 수행 로직 포함                      |

### 동작 흐름

1. Chainlink Automation이 주기적으로 `checkUpkeep` 호출
2. `checkUpkeep`이 `true` 반환 → `performUpkeep` 실행
3. `checkUpkeep`이 `false` 반환 → 아무 작업 없음

---

## CustomLogic 컨트랙트 생성

### 1. 파일 생성

Remix의 `contracts` 폴더에 `CustomLogic.sol` 파일을 생성한다.

### 2. 코드 구조 요약

#### Constructor

- `_updateInterval`: 업데이트 간격(초 단위)
- 배포 시 `_updateInterval`을 `300`(5분)으로 설정
- `lastUpdatedTimestamp`를 `block.timestamp`로 초기화

#### 필수 구현 함수

- **checkUpkeep**: upkeep 실행 여부 결정. 조건 충족 시 `true` 반환
- **performUpkeep**: 실제 upkeep 수행 로직

> **참고**: 예제에서는 설명을 위해 시간 기반 트리거를 사용하지만, custom logic은 온체인에서 표현 가능한 모든 조건을 평가할 수 있다.

---

## 배포 및 검증

### Sepolia에 배포

1. 이전 레슨과 동일한 절차로 Sepolia에 배포
2. **Constructor parameter** 설정: `_updateInterval` = `300` (5분)
3. Deploy 클릭
4. 배포된 컨트랙트 인스턴스를 workspace에 고정하여 Remix 재로드 시 유지되도록 함

### Etherscan 검증

1. **Flattening**: 외부 import가 있으므로 먼저 flatten 수행
   - File Explorer에서 `CustomLogic.sol` 우클릭 → **Flatten** 선택
   - `CustomLogic_flattened.sol` 파일이 생성됨
2. Flatten된 코드 전체를 Etherscan 검증 시 입력

---

## checkUpkeep 테스트

5분이 지나면 `checkUpkeep`이 `true`를 반환한다. 이는 custom logic upkeep 설정 후 automation 시스템이 `performUpkeep`을 실행할 준비가 되었음을 의미한다.

> **팁**: `checkUpkeep`과 `performUpkeep`을 수동으로 호출할 때는 빈 bytes 배열(`0x`)을 인자로 전달한다.

---

## Custom Logic Upkeep 등록

### 1. Chainlink Automation 앱 접속

컨트랙트 배포 후 [Chainlink Automation](https://automation.chain.link/)에서 automation job 생성

### 2. 트리거 선택

- **Custom Logic** 선택
- 배포된 컨트랙트 주소 입력
- **Next** 클릭

### 3. Upkeep 상세 설정

| 항목                    | 설명                                                          |
| ----------------------- | ------------------------------------------------------------- |
| **Upkeep name**         | 대시보드에 표시되는 이름 (예: "TimeBased Counter")            |
| **Admin Address**       | 연결된 지갑이 기본값. 필요 시 변경 가능                       |
| **Gas limit**           | upkeep 함수 최대 가스량 (기본값: 500,000)                     |
| **Starting balance**    | Chainlink Automation 비용 지불용 LINK. 예시에서는 5 LINK 권장 |
| **Project information** | 선택 사항 (비워두어도 됨)                                     |

### 4. 등록 완료

- 등록 요청 확인
- 메시지 서명으로 upkeep 소유권 인증

---

## 대시보드 확인

### Overview

- Upkeep 상태
- 마지막 실행 시각
- 현재 LINK 잔액
- 소비된 LINK 양

### Details

- 다음 실행 예정 시각
- 호출될 함수 정보

### History

- 실행 이력 전체 조회
- 5분 경과 후 페이지 새로고침 시 실행 완료 확인 가능

### 동작 확인

Remix에서 5분 경과 후 `counter` 값이 증가했는지 확인한다. Upkeep은 LINK가 소진되거나 pause될 때까지 계속 실행된다.
