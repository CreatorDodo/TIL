# Chainlink Data Feeds

Chainlink Data Feeds에 대해 학습한 내용을 정리합니다.

## 참고 자료

- [Using Data Feeds | Chainlink Documentation](https://docs.chain.link/data-feeds)
- [Developer Hub | Data](https://dev.chain.link/)

---

## Chainlink Data Feeds 개요

Chainlink Data Feeds는 **자산 가격**, **준비금 잔액**, **L2 시퀀서 상태** 등 실제 세계의 데이터를 가져와 스마트 컨트랙트에서 활용할 수 있게 해줍니다.

### Data Feed 유형

| 유형 | 설명 |
|------|------|
| **Price Feeds** | 암호화폐 자산 가격을 집계하여 제공 |
| **SmartData Feeds** | 토큰화된 실물자산(RWA)의 유틸리티, 접근성, 신뢰성을 향상시키는 온체인 데이터 |
| **Rate and Volatility Feeds** | 금리, 금리 곡선, 자산 변동성 데이터 제공 |
| **L2 Sequencer Uptime Feeds** | L2 시퀀서의 가용성 상태 확인 |

---

## Data Feed 구성 요소

### 1. Consumer (소비자 컨트랙트)

- Chainlink 서비스를 사용하는 **온체인/오프체인 컨트랙트**
- `AggregatorV3Interface`를 통해 Data Feed 온체인 컨트랙트와 상호작용
- 개발자가 직접 설계하고 구현하는 스마트 컨트랙트
- 사용 가능한 함수 목록: [Data Feeds API Reference](https://docs.chain.link/data-feeds/api-reference) 참고

### 2. Proxy Contract (프록시 컨트랙트)

- 특정 Data Feed의 데이터를 수신하는 **올바른 Aggregator 컨트랙트를 가리킴**
- 프록시를 사용하면 소비자 컨트랙트의 서비스 중단 없이 기본 Aggregator 업그레이드 가능
- 대표적인 예시: [`EACAggregatorProxy.sol`](https://github.com/smartcontractkit/chainlink/blob/master/contracts/src/v0.8/shared/interfaces/EACAggregatorProxy.sol)

### 3. Aggregator Contract (집계자 컨트랙트)

- Chainlink가 관리하는 스마트 컨트랙트
- **Chainlink 분산 오라클 네트워크**로부터 주기적인 데이터 업데이트 수신
- 집계된 데이터를 온체인에 저장하여 소비자가 **동일 트랜잭션 내에서** 조회 및 활용 가능
- 데이터의 **투명성**과 **공개 검증 가능성** 보장

---

## 아키텍처 흐름

```
[Oracle Network] → [Aggregator Contract] → [Proxy Contract] → [Consumer Contract]
```

1. 오라클 네트워크가 외부 데이터를 수집 및 집계
2. Aggregator 컨트랙트에 데이터 저장
3. Proxy 컨트랙트가 최신 Aggregator를 가리킴
4. Consumer 컨트랙트가 데이터를 조회하여 사용
