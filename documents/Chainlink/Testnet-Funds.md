# Testnet Funds

이 코스에서는 스마트 컨트랙트에서 Chainlink의 서비스를 사용합니다. 이러한 컨트랙트를 테스트넷에 배포하고 상호작용할 것입니다. 주로 Sepolia를 사용하지만, 일부 경우에는 Base Sepolia도 사용합니다.

## Faucet 사용하기

Blockchain Basics 코스에서 가스 비용을 지불하기 위해 faucet을 사용하여 테스트넷 Sepolia ETH를 얻는 방법을 다뤘습니다. 이번에는 LINK 토큰을 얻는 방법을 빠르게 복습해보겠습니다.

### Testnet LINK

네이티브 토큰 외에도 테스트넷 LINK가 필요합니다. **LINK**는 Chainlink 서비스를 사용할 때 서비스 제공자에게 지불하는 데 사용되는 토큰입니다.

테스트넷 LINK를 얻는 방법, MetaMask에 LINK를 추가하는 방법, 그리고 다른 주소로 토큰을 보내는 방법을 알아보겠습니다. (예: LINK로 스마트 컨트랙트에 자금을 조달하는 경우)

#### MetaMask에 LINK 추가하기

1. [Chainlink 문서](https://docs.chain.link/resources/link-token-contracts)로 이동하여 LINK를 사용하려는 체인으로 스크롤합니다. (예: [Sepolia Testnet](https://docs.chain.link/resources/link-token-contracts#sepolia-testnet))

2. **Add to wallet** 버튼을 클릭하여 LINK 토큰을 MetaMask로 가져옵니다.

   - 이 작업은 해당 특정 네트워크에만 토큰을 추가합니다
   - LINK 토큰을 사용하려는 모든 네트워크에서 이 과정을 반복해야 합니다

3. **Add token**을 클릭하여 MetaMask에 토큰을 추가합니다.

#### LINK Faucet 사용하기

1. [Chainlink Faucet](https://faucets.chain.link/) 페이지로 이동합니다. 지원되는 모든 네트워크 목록이 표시됩니다.

2. 오른쪽 상단의 **Link** 버튼을 클릭하고, LINK를 받고 싶은 네트워크를 선택한 후 **Continue**를 클릭합니다.

3. **Get tokens**를 클릭하고 MetaMask에서 **Confirm**을 클릭하여 트랜잭션에 서명합니다.

4. 트랜잭션이 확인되면 지갑에서 LINK 잔액을 확인할 수 있습니다.

### MetaMask에 토큰 추가하기

Chainlink가 **Add to wallet** 버튼을 포함해서 LINK는 쉽게 추가할 수 있었습니다. 하지만 USDC 같은 다른 토큰은 어떻게 MetaMask에 추가할까요?

1. **토큰 주소 찾기**: USDC의 경우 [Circle 문서](https://developers.circle.com/stablecoins/usdc-on-test-networks)에서 다양한 체인의 USDC 컨트랙트 주소를 찾을 수 있습니다. 작업 중인 체인의 USDC 토큰 주소를 복사합니다.

2. **네트워크 확인**: MetaMask를 열고 왼쪽 상단의 네트워크 버튼을 클릭하여 방금 복사한 토큰 주소와 같은 체인에 있는지 확인합니다.

3. **토큰 가져오기**: **Tokens** 탭을 클릭하고, 세로 점 세 개 버튼을 클릭한 다음 **Import tokens**를 클릭합니다.

4. **토큰 컨트랙트 주소 입력**: MetaMask는 ERC-20 표준을 따르는 경우 토큰과 관련 정보를 자동으로 감지합니다.

5. **정보 확인**: Address, Token Symbol, Decimals가 올바른지 확인합니다.

6. **Import 완료**: **Next**를 클릭하여 정보를 확인하고, **Import**를 클릭하여 MetaMask에 토큰을 가져옵니다. 이제 잔액을 확인하고 MetaMask UI를 사용하여 다른 사람에게 토큰을 보낼 수 있습니다.

### 다른 주소로 토큰 보내기

1. **Tokens** 탭을 클릭한 다음, 보내려는 토큰을 클릭합니다. (이미 가져온 토큰이어야 합니다. 예: LINK 토큰)

2. **Send** 버튼을 클릭합니다.

3. 토큰을 보내려는 **주소를 붙여넣기**합니다.

4. **금액을 입력**하고 **Next**를 클릭합니다.

5. 트랜잭션에 서명하려면 **Confirm**을 클릭합니다. 이제 트랜잭션이 전송되고 지정한 주소로 토큰이 전송됩니다.

---

## 요약

| 작업                   | 방법                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| 테스트넷 LINK 얻기     | [Chainlink Faucet](https://faucets.chain.link/) 사용                                            |
| LINK를 MetaMask에 추가 | [Chainlink 문서](https://docs.chain.link/resources/link-token-contracts)에서 Add to wallet 클릭 |
| 다른 토큰 추가         | 토큰 컨트랙트 주소로 Import tokens                                                              |
| 토큰 전송              | Tokens 탭 → 토큰 선택 → Send                                                                    |

## 참고 링크

- [Chainlink Faucet](https://faucets.chain.link/)
- [Chainlink LINK Token Contracts](https://docs.chain.link/resources/link-token-contracts)
- [Circle USDC Test Networks](https://developers.circle.com/stablecoins/usdc-on-test-networks)
