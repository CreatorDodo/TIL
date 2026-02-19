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
