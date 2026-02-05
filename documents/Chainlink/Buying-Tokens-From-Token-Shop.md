# TokenShop에서 토큰 구매하기

Section 2에서 배포한 TokenShop 컨트랙트를 사용하여 MyERC20 토큰을 구매하는 방법을 알아봅니다.

## 토큰 구매 절차

1. MetaMask를 열고 **Send** 버튼 클릭
2. **To** 주소에 TokenShop 컨트랙트 주소 입력
3. Amount에 **0.001 ETH** 입력
4. **Continue** → **Confirm** 클릭하여 트랜잭션 전송

## 동작 원리

TokenShop 컨트랙트에 ETH를 전송하면 `receive` 함수가 트리거됩니다. 이 함수는 Chainlink Price Feeds를 사용하여 ETH 금액을 USD로 변환하고, 해당 금액에 맞는 MyERC20 토큰을 지갑 주소로 민팅합니다.

## 토큰 잔액 확인 방법

### 방법 1: MetaMask에서 확인

MetaMask 지갑의 **Tokens** 탭에서 이전에 추가한 토큰의 잔액이 업데이트되었는지 확인합니다.

### 방법 2: Remix에서 확인

1. Remix에서 MyERC20 컨트랙트 클릭
2. `balanceOf` 함수 호출
3. 본인의 지갑 주소를 파라미터로 전달
4. 토큰 보유량 확인

## 정리

이 과정을 통해 Chainlink Price Feeds를 활용하여 ETH를 USD로 변환하고, TokenShop 컨트랙트를 통해 MyERC20 토큰을 구매 및 민팅하는 전체 흐름을 완료했습니다.