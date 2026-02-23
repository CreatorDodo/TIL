# Chainlink Log Trigger Automation

Log Trigger는 Chainlink Automation에서 **온체인 이벤트(로그)**에 반응해 스마트 컨트랙트 함수를 자동 실행하는 방식이다. 특정 이벤트가 emit되면 Automation이 이를 감지하고 대상 컨트랙트의 지정 함수를 호출한다.

이번 레슨에서는 **두 개의 컨트랙트**로 로그 트리거 자동화를 구성한다.

| 컨트랙트         | 역할                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| **EventEmitter** | 특정 함수 호출 시 `WantsToCount` 이벤트를 emit → Automation 트리거 신호 |
| **LogTrigger**   | Automation이 호출하는 함수로 **호출 횟수(counter)** 를 기록             |

→ **이벤트 기반 자동화(event-driven automation)** 패턴을 보여준다.

---
