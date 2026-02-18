# Chainlink Custom Logic Automation

Custom logic upkeeps를 사용하면 스마트 컨트랙트 내부에 특수 조건을 정의하여 **정확히 언제 upkeep이 실행되어야 하는지** 결정할 수 있다. 단순한 트리거 메커니즘과 달리, custom logic은 함수 실행 시점을 완전히 제어할 수 있게 해준다.

## 개요

- **Custom Logic vs 표준 트리거**: 표준 time-based upkeep과 달리, 컨트랙트 내부에서 조건을 직접 평가
- **핵심 메커니즘**: `checkUpkeep` 함수가 `true`를 반환하면 `performUpkeep`이 실행됨
- **유연성**: 시간 외에도 온체인 조건이나 조건의 조합 등 Solidity로 표현 가능한 모든 조건 사용 가능

---
