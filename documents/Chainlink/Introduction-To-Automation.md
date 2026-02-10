# Introduction to Automation

Chainlink Automation은 사전 정의된 조건이나 특정 간격에 따라 스마트 컨트랙트 함수를 자동으로 실행하는 탈중앙화 서비스입니다.

## 왜 자동화가 필요한가?

스마트 컨트랙트는 강력하지만 근본적인 한계가 있습니다: **자체 함수를 트리거할 수 없습니다**. 코드를 실행하려면 외부 자극이 필요하며, Chainlink Automation이 바로 이 역할을 합니다.

스마트 컨트랙트를 정교한 기계라고 생각해보세요. 다양한 작업을 수행할 수 있지만, 이러한 함수를 활성화하려면 누군가가 버튼을 눌러야 합니다. 조건을 수동으로 모니터링하고 함수를 트리거하는 것은 기계가 적시에 작업을 수행하도록 보장하는 비효율적이고 신뢰할 수 없는 방법입니다.

Chainlink Automation은 스마트 컨트랙트를 위한 경계하는 운영자 역할을 하여 이 문제를 해결합니다. 정의한 특정 조건이나 시간대를 지속적으로 모니터링합니다. 이러한 트리거가 충족되면 Chainlink Automation은 자동으로 컨트랙트의 지정된 함수를 실행합니다. 24/7 운영되며, 수동 모니터링이 달성할 수 없는 신뢰성과 정밀도를 제공합니다.

## "Upkeep"의 개념

Chainlink Automation에서 **"upkeep"**은 네트워크가 모니터링하고 적절할 때 온체인에서 실행할 등록된 작업을 의미합니다.

upkeep을 등록하면, 본질적으로 Automation 네트워크에 다음과 같이 말하는 것입니다: "이러한 특정 조건을 감시하고, 발생하면 내 컨트랙트의 이 함수를 호출하세요."

이러한 특정 조건을 **"트리거(triggers)"**라고 합니다.

## 자동화 트리거 유형

Chainlink Automation은 세 가지 고유한 트리거 메커니즘을 지원합니다:

### 1. 시간 기반 트리거 (Time-based triggers)

- cron 표현식으로 정의된 일정에 따라 스마트 컨트랙트의 함수를 실행합니다
- 예: 매일 자정 또는 주 1회 실행되도록 설정 가능

### 2. 커스텀 로직 트리거 (Custom logic triggers)

- `AutomationCompatibleInterface`를 통해 스마트 컨트랙트 내에 정의된 커스텀 로직을 사용합니다
- 컨트랙트는 실행 조건이 적절한지 여부를 반환하는 `checkUpkeep` 함수를 구현합니다

### 3. 로그 트리거 (Log trigger)

- 스마트 컨트랙트가 발생시킨 블록체인 이벤트(로그)를 모니터링합니다
- 지정된 이벤트가 발생하면 Chainlink Automation이 관련 함수를 실행하여 이벤트 기반 자동화를 가능하게 합니다

## Automation 아키텍처

Chainlink Automation Network는 Automation Registry 스마트 컨트랙트에 의해 조정되는 전문 Automation 노드로 구성됩니다. 이 Registry는 upkeep 등록을 관리하고 성공적인 실행에 대해 노드에 보상을 제공합니다.

- 개발자는 upkeep을 등록할 수 있습니다
- 노드 운영자는 Automation 노드로 등록할 수 있습니다
- 네트워크는 Chainlink의 OCR3 프로토콜을 기반으로 한 피어투피어 시스템을 사용하여 운영됩니다

### 실행 프로세스

1. Automation 노드는 실행 가능한 upkeep을 지속적으로 스캔합니다
2. 노드는 어떤 upkeep을 수행할지 합의에 도달합니다
3. 암호화 서명된 보고서를 생성합니다
4. Registry는 upkeep 함수를 실행하기 전에 이러한 보고서를 검증합니다

### 주요 이점

- **암호화 보장**: 실행의 암호화 보장
- **내장된 중복성**: 여러 노드에 걸친 내장된 중복성
- **네트워크 혼잡 저항**: 정교한 가스 관리로 네트워크 혼잡에 대한 저항력
- **안정적인 성능**: 가스 가격 급등이나 블록체인 재구성 중에도 안정적인 성능

시스템은 네트워크 상태를 유지하고 높은 신뢰성과 성능을 보장하기 위한 내부 모니터링 및 알림 메커니즘을 포함합니다.

## 추가 정보

- Chainlink Automation은 여러 블록체인을 지원합니다. 지원되는 네트워크에 대한 자세한 내용은 [지원 네트워크 페이지](https://docs.chain.link/chainlink-automation/supported-networks)를 참조하세요
- Chainlink Automation 사용 비용에 대한 정보는 [Automation 경제학 페이지](https://docs.chain.link/chainlink-automation/automation-economics)에서 확인할 수 있습니다
