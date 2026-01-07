# Deploying An ERC-20 Contract

ERC-20 토큰 컨트랙트를 작성했으니, 이제 라이브 테스트넷에 배포하고 MetaMask에 토큰을 추가하여 잔액을 확인하고 UI를 통해 토큰 전송을 수행해보자.

## Compile & Deploy

### 1. 스마트 컨트랙트 컴파일

1. `MyERC20.sol` 파일이 열려있는지 확인
2. 왼쪽 사이드바에서 **Solidity compiler** 탭으로 이동
3. 컴파일러 버전 선택
   - 여기서는 버전 `0.8.19` 사용
   - pragma 지시문(`pragma solidity ^0.8.19;`)에 따라 `0.8.19` 이상으로 설정
   - `^` 기호: 해당 버전 이상 사용 가능
   - `^` 기호 없음: 정확히 해당 버전만 사용 가능
4. **Compile MyERC20.sol** 클릭하여 컴파일
   - 단축키: Mac `Cmd + S` / Windows `Ctrl + S`
   - 에러가 없으면 초록색 체크마크 표시

### 2. 스마트 컨트랙트 배포

1. 왼쪽 사이드바에서 **Deploy and run transactions** 탭으로 이동
2. MetaMask로 배포하기 위해 **Select Environment** 드롭다운에서 **Injected Provider - MetaMask** 선택
3. MetaMask가 열리면 Remix와 연결하기 위해 **Connect** 클릭
4. Contract 드롭다운에서 `MYERC20.sol` 선택
5. **Deploy** 클릭
6. MetaMask에서 트랜잭션 서명

### 배포 성공 확인 방법

- Remix 터미널 창(화면 하단)에 트랜잭션 정보 옆에 초록색 체크 표시
- MetaMask에 성공적인 컨트랙트 배포 트랜잭션 표시
- Remix의 **Deployed contracts** 섹션에 컨트랙트 표시

> **Note**: 다음 섹션에서 이 ERC-20 컨트랙트를 사용할 예정이므로, 컨트랙트를 **핀(pin)** 해두고 주소를 복사해서 보관해두는 것이 좋다.

## Check Total Token Supply and Balances

1. 컨트랙트가 배포되면 **Deployed Contracts** 섹션에서 확인 가능
2. 컨트랙트 내의 모든 함수를 직접 호출하여 상호작용할 수 있음
3. **핀 아이콘**을 클릭하여 컨트랙트를 고정
   - Remix를 닫았다가 다시 열어도 컨트랙트가 저장됨
   - 핀 고정은 워크스페이스별로 적용되므로, 토큰 컨트랙트에 접근할 때 같은 Remix 워크스페이스를 열어야 함

### 주요 함수

| 함수          | 설명                                                |
| ------------- | --------------------------------------------------- |
| `totalSupply` | 토큰의 총 공급량 확인                               |
| `balanceOf`   | 특정 지갑의 잔액 확인 (지갑 주소를 파라미터로 전달) |

> 현재 토큰이 민팅되지 않았으므로 두 함수 모두 `0`을 반환한다.
