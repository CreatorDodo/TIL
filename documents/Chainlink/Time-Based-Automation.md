# Chainlink Time-Based Automation

Time-based automation을 사용하면 **외부에서 호출 가능한** 기존 스마트 컨트랙트의 함수를 자동화할 수 있다.  
이 문서에서는 Ethereum Sepolia에 기본 카운터 컨트랙트를 배포하고, **count** 함수를 5분마다 호출하는 Automation을 설정하는 방법을 다룬다.

---

## 사전 요구사항

- Testnet Sepolia ETH
- Testnet LINK (Sepolia)

---

## 1. Counter 컨트랙트 작성

### 1.1 Remix 워크스페이스 생성

1. Remix를 열고 햄버거 메뉴 → **Create blank workspace** 선택
2. 워크스페이스 이름: `Automation` → **Ok**

### 1.2 컨트랙트 파일 생성

1. **Create folder**로 `contracts` 폴더 생성
2. `contracts` 폴더 안에 **Create file**로 `TimeBased.sol` 생성
3. 강의/레포의 코드를 `TimeBased.sol`에 붙여넣기

이 컨트랙트는 초기값 0의 `counter` 상태 변수를 갖고, `count()`가 호출될 때마다 1씩 증가한다.

> **Tip:** `counter++`는 `counter = counter + 1`과 동일한 Solidity 단축 표기이다.

---

## 2. TimeBased 컨트랙트 배포

### 2.1 컴파일

- **Solidity compiler** 탭 → **Compile TimeBased.sol** 클릭

### 2.2 환경 설정 및 배포

1. **Deploy & run transactions** 탭에서 **Environment**: `Injected Provider - MetaMask` 선택 (MetaMask 연결)
2. MetaMask에서 네트워크가 **Sepolia**인지 확인
3. **Deploy** 클릭 → MetaMask에서 트랜잭션 **Confirm**

### 2.3 배포 성공 확인

- Remix 하단 터미널에 녹색 체크 표시
- MetaMask에 컨트랙트 배포 트랜잭션 성공 표시
- **Deployed contracts** 영역에 컨트랙트 목록 표시

### 2.4 컨트랙트 고정 및 주소 복사

- **핀 아이콘**으로 워크스페이스에 TimeBased 컨트랙트 고정 (새로고침 시에도 유지)
- **복사 버튼**으로 컨트랙트 주소 복사

> 이후 Remix에서 워크스페이스/폴더/파일 생성, 컴파일, MetaMask 연결, 배포, 컨트랙트 고정 등은 숙지된 것으로 가정한다. 필요 시 Section 2의 Remix 워크스루를 참고한다.

---

## 3. 스마트 컨트랙트 검증 (Verify)

Automation이 `count`를 호출하려면 블록 익스플로러 등에서 컨트랙트 ABI를 읽을 수 있어야 하므로 **검증(Verify)**이 필요하다.

### 3.1 Etherscan에서 검증

1. [Etherscan](https://etherscan.io) 접속
2. TimeBased 컨트랙트 주소 검색 → **Contract** 탭 → **Verify and Publish**
3. 컨트랙트 정보 입력 (컴파일러 버전은 Remix의 Solidity compiler 탭에서 확인) → **Continue**
4. 다음 화면에 컨트랙트 소스 코드 붙여넣기, 나머지는 기본값 → **Verify and Publish**

### 3.2 검증 완료 확인

- Contract 탭 옆에 **녹색 체크** 표시
- **Read contract** / **Write contract** 탭에서 소스 코드 확인 및 상호작용 가능

---
