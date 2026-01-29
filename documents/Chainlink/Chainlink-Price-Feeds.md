# Chainlink Price Feeds

## 개요

Chainlink Price Feeds는 Chainlink 네트워크에서 제공하는 **탈중앙화 데이터 피드**로, 암호화폐, 원자재 및 기타 금융 상품의 신뢰할 수 있고 변조 방지된 가격 데이터를 제공합니다.

Price Feeds는 스마트 컨트랙트가 자산 가격 및 시장 데이터와 같은 중요한 실시간 데이터에 기반하여 동작할 수 있게 합니다. 특히 **DeFi 애플리케이션**에서 정확하고 시의적절한 가격 정보는 신뢰 최소화(trust-minimized)되고 효율적인 전통 금융의 대안을 제공하는 데 핵심적입니다.

---

## 주요 사용 사례

### 1. DeFi 프로토콜

- Aave, Compound 등 다양한 DeFi 플랫폼에서 대출, 차입, 거래 등의 금융 서비스를 위한 실시간 자산 가격 결정에 사용
- **예시**: AAVE는 Data Feeds를 사용하여 공정한 시장 가격으로 대출이 실행되고, 대출이 항상 충분히 담보되도록 보장

### 2. 스테이블코인

- 스테이블코인을 "뒷받침"하는 자산의 정확한 시장 가치를 제공하여 페그(peg) 유지에 기여

### 3. 파생상품 및 예측 시장

- 파생상품 계약 정산 및 예측 시장에 실시간 시장 데이터 제공

---

## Chainlink Data Feeds 찾기

자산 가격은 **자산 쌍(asset pairs)** 형태로 제공됩니다. 한 자산의 가치는 다른 자산과의 관계로 표현됩니다.

> 예: 1 USD = 0.89 Euro

### Data Feeds 조회

- **공식 사이트**: [https://data.chain.link/](https://data.chain.link/)
- 이용 가능한 페어와 체인 정보 확인 가능

> **참고**: Data Feeds와 Data Streams는 유사하지만 동일하지 않습니다.

---

## 사용 방법

Data Feed에서 정보를 가져오려면 해당 피드의 **온체인 주소(on-chain address)** 를 알아야 합니다.

### Contract Addresses

- [Chainlink Data Feeds Contract Addresses 전체 목록](https://docs.chain.link/data-feeds/price-feeds/addresses)
