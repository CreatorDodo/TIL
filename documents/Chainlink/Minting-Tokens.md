# ERC20 토큰 민팅 및 승인 가이드

## 토큰 민팅 (Minting Tokens)

컨트랙트를 배포한 직후에는 아직 토큰을 민팅하지 않았기 때문에 총 공급량이 0입니다. 즉, 현재 존재하는 토큰이 없는 상태입니다.

토큰 공급량을 늘리려면 컨트랙트의 `mint` 함수를 호출해야 합니다.

### 민팅 절차

1. **Deploy & Run Transactions 탭으로 이동**

2. **배포된 토큰 컨트랙트를 찾아 확장하여 함수 목록 확인**

3. **`mint` 함수를 찾아 파라미터 입력**

   - `to`: 민팅된 토큰을 받을 주소
   - `amount`: 민팅할 수량

4. **transact 버튼 클릭 후 MetaMask에서 트랜잭션 승인**

### 수량 계산 시 주의사항

토큰이 18 decimals를 사용하는 경우, 100개의 토큰을 민팅하려면 다음과 같이 입력해야 합니다:

```
100000000000000000000 (100 × 10^18)
```

### 잔액 확인 방법

- `balanceOf` 함수를 호출하고 토큰을 받은 주소를 입력하여 확인
- MetaMask의 Tokens 탭에서 직접 확인 (사전에 토큰 추가 필요)

---

## Allowance와 토큰 승인 (Token Approvals)

토큰 승인은 다른 주소가 내 토큰을 대신 사용할 수 있도록 권한을 부여하는 기능입니다.

### 주요 사용 사례

DeFi 애플리케이션에서 중개 스마트 컨트랙트를 통해 ERC20 토큰을 내 지갑에서 다른 지갑이나 컨트랙트로 전송할 때 사용됩니다.

### approve 함수

토큰 사용 권한을 부여할 때 사용합니다.

**파라미터:**

- `spender`: 토큰을 사용할 권한을 받을 주소
- `amount`: 사용 가능한 최대 수량

### allowance 함수

특정 컨트랙트나 주소가 내 토큰을 사용할 권한이 있는지 확인할 때 사용합니다.

**파라미터:**

- `owner`: 토큰 소유자 주소
- `spender`: 권한을 확인할 주소

**반환값:** 승인된 토큰 수량

---

## 참고 자료

- [Cyfrin Updraft - Minting Tokens](https://updraft.cyfrin.io/courses/chainlink-fundamentals/smart-contract-and-solidity-fundamentals/minting-tokens)
