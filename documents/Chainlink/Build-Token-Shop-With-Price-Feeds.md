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

### Ownable

계약에 소유자를 설정하기 위해 OpenZeppelin의 `Ownable` 계약을 상속합니다. 이를 통해 `onlyOwner` modifier를 사용하여 계약 소유자만 특정 함수를 호출할 수 있도록 제한할 수 있습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Ownable } from "@openzeppelin/contracts@5.2.0/access/Ownable.sol";

contract TokenShop is Ownable {
    constructor() Ownable(msg.sender) {} // 계약 배포자(msg.sender)를 소유자로 설정
}
```

### State Variables와 Constructor

**Immutable 변수 (생성자에서 설정):**

- `i_priceFeed`: ETH/USD Price Feed 계약 (AggregatorV3Interface 타입으로 캐스팅)
- `i_token`: MyERC20 계약 인스턴스

**Constant 상태 변수:**

- `TOKEN_DECIMALS`: MyERC20 토큰의 소수점 자릿수 (18)
- `TOKEN_USD_PRICE`: USD 기준 토큰 가격

```solidity
AggregatorV3Interface internal immutable i_priceFeed;
MyERC20 public immutable i_token;

uint256 public constant TOKEN_DECIMALS = 18;
uint256 public constant TOKEN_USD_PRICE = 2 * 10 ** TOKEN_DECIMALS; // 2 USD (18 decimals)

event BalanceWithdrawn();

error TokenShop__ZeroETHSent();
error TokenShop__CouldNotWithdraw();

constructor(address tokenAddress) Ownable(msg.sender) {
    i_token = MyERC20(tokenAddress);
    /**
    * Network: Sepolia
    * Aggregator: ETH/USD
    * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
    */
    i_priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
}
```

### Receive Function

사용자가 ETH를 보내고 토큰을 받을 수 있게 하는 특수 함수입니다. `receive` 함수는 사용자가 특정 함수를 지정하지 않고 계약 주소로 ETH를 직접 보낼 때 자동으로 실행됩니다.

```solidity
receive() external payable {
    if (msg.value == 0) {
        revert TokenShop__ZeroETHSent();
    }
    // 전송된 ETH를 토큰 수량으로 변환 후 민팅
    i_token.mint(msg.sender, amountToMint(msg.value));
}
```

> **Note:** TokenShop 계약에 `MyERC20::mint` 호출 권한을 부여해야 합니다.

### amountToMint Function

ETH/USD 가격을 조회하여 전송된 ETH를 USD로 변환하고, 해당 USD 금액에 해당하는 토큰 수량을 계산합니다:

```solidity
function amountToMint(uint256 amountInETH) public view returns (uint256) {
    // ETH를 USD로 변환
    uint256 ethUsd = uint256(getChainlinkDataFeedLatestAnswer()) * 10 ** 10; // 8 decimals -> 18 decimals
    uint256 ethAmountInUSD = amountInETH * ethUsd / 10 ** 18; // ETH = 18 decimals
    return (ethAmountInUSD * 10 ** TOKEN_DECIMALS) / TOKEN_USD_PRICE;
}
```

### Chainlink Data Feeds 구현

ETH/USD 가격을 가져오는 함수입니다:

```solidity
/**
* Returns the latest answer
*/
function getChainlinkDataFeedLatestAnswer() public view returns (int) {
    (
        /*uint80 roundID*/,
        int price,
        /*uint startedAt*/,
        /*uint timeStamp*/,
        /*uint80 answeredInRound*/
    ) = i_priceFeed.latestRoundData();
    return price;
}
```

### Withdraw Function

계약 소유자가 계약 내 ETH를 인출할 수 있는 함수입니다:

```solidity
function withdraw() external onlyOwner {
    (bool success, ) = payable(owner()).call{value: address(this).balance}("");
    if (!success) {
        revert TokenShop__CouldNotWithdraw();
    }
    emit BalanceWithdrawn();
}
```

> 스마트 계약 내 ETH 전송에 대한 자세한 내용은 [Updraft 강의](https://updraft.cyfrin.io/)를 참조하세요.

---

## TokenShop 계약 배포

1. Remix의 **Deploy & Run Transactions** 탭으로 이동
2. Contract 필드에서 `TokenShop.sol` 선택
3. MetaMask가 Sepolia 네트워크에 연결되어 있는지 확인
4. Environment를 **Injected Provider - MetaMask**로 설정
5. Constructor 파라미터에 이전에 배포한 `MyERC20.sol` 계약 주소 입력
6. **Deploy** 클릭 → MetaMask에서 **Confirm**으로 트랜잭션 서명

배포 후:

- Remix 콘솔에서 트랜잭션 세부 정보 확인
- Deployed Contracts에서 TokenShop 계약 주소 복사
- 계약을 **Pin**하여 나중에도 접근 가능하도록 설정

---

## TokenShop 접근 제어 설정

TokenShop 계약에 MyERC20 토큰을 민팅할 수 있는 `MINTER_ROLE` 권한을 부여해야 합니다.

### MINTER_ROLE 확인

1. Deployed contracts에서 MyERC20 계약 드롭다운 찾기
2. `MINTER_ROLE` 함수 클릭하여 값 확인

```
0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6
```

이 값은 "MINTER_ROLE" 문자열의 keccak256 해시입니다.

### 권한 부여

1. `grantRole` 함수 확장
2. 파라미터 입력:
   - **role**: `0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6`
   - **account**: TokenShop 계약 주소
3. **transact** 클릭 → MetaMask에서 **Confirm**

### 권한 확인

`hasRole` 함수를 사용하여 권한이 제대로 부여되었는지 확인합니다:

| 파라미터 | 값                                                                   |
| -------- | -------------------------------------------------------------------- |
| role     | `0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6` |
| account  | TokenShop 계약 주소                                                  |

반환값이 `true`이면 권한이 정상적으로 부여된 것입니다.

---

## Chainlink Price Feeds에서 가격 데이터 가져오기

1. TokenShop 계약 드롭다운에서 `getChainlinkDataFeedLatestAnswer` 함수 찾기
2. 함수 호출하여 트랜잭션 전송
3. **8자리 소수점**을 가진 가격이 반환됨

**가격 변환 예시:**

반환값 `191796000000`을 실제 가격으로 변환하려면:

```
191796000000 / 10^8 = $1917.96
```

> **Note:** 피드마다 정밀도가 다를 수 있습니다. 각 피드의 소수점 자릿수는 [Price Feeds Documentation](https://docs.chain.link/data-feeds/price-feeds/addresses)에서 확인할 수 있습니다 ("Show More Details" 체크).
