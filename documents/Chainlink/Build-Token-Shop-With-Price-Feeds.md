# Build a Token Shop with Price Feeds

Chainlink Data Feeds를 사용하여 토큰 가격을 계산하는 "TokenShop" 스마트 계약을 만드는 방법을 학습합니다.

## 개요

사용자가 ETH를 계약에 보내면 다음 과정이 진행됩니다:

1. 현재 ETH/USD 환율 조회
2. 전송된 ETH의 USD 가치 계산
3. 고정된 USD 토큰 가격 기준으로 민팅할 토큰 수량 결정
4. 계산된 토큰을 구매자에게 직접 민팅 및 전송

TokenShop 계약은 섹션 2에서 만든 커스텀 ERC-20 토큰 계약과 통합됩니다.

---

## TokenShop 스마트 계약 작성

### 1. 파일 생성

1. [Remix IDE](https://remix.ethereum.org/)를 엽니다
2. 왼쪽 File Explorer에서 `TokenShop.sol` 파일을 새로 생성합니다
3. [GitHub 코드 저장소](https://github.com/Cyfrin/chainlink-fundamentals-cu)에서 코드를 복사하여 붙여넣습니다

---

## 코드 이해하기

### Imports

Price Feed와 MyERC20의 함수를 호출하기 위해 필요한 imports입니다:

```solidity
import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import { Ownable } from "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
import { MyERC20 } from "./MyERC20.sol";
```
