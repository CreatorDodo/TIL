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
