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

## 4. Time-Based Automation 생성

컨트랙트 배포 및 검증이 끝났다면, 자동 카운팅을 위한 Automation을 등록한다.

### 4.1 Upkeep 등록 시작

1. [Chainlink Automation](https://automation.chain.link) 접속
2. **Register new Upkeep** → **Connect wallet** (MetaMask 연결)
3. 앱 우측 상단 네트워크 드롭다운에서 **Sepolia** 선택

### 4.2 트리거 설정

- **Trigger**: **Time-based trigger** 선택 → **Next**

### 4.3 타깃 컨트랙트 설정

- TimeBased **컨트랙트 주소** 입력 → **Next**
- 검증된 컨트랙트면 ABI는 자동으로 가져온다. 미검증 컨트랙트는 ABI를 직접 입력할 수 있다.

### 4.4 실행 함수 및 스케줄 설정

- **Target function**: `count` 선택 (Automation이 실행할 함수) → **Next**
- **실행 주기**: 이 예시에서는 **5분마다** 실행 → Cron 표현식: `*/5 * * * *`

#### Cron 표현식 요약

| 필드         | 범위 | 설명                                |
| ------------ | ---- | ----------------------------------- |
| Minute       | 0–59 | 분                                  |
| Hour         | 0–23 | 시 (0 = 자정)                       |
| Day of month | 1–31 | 일                                  |
| Month        | 1–12 | 월 (Jan, Feb 등 이름 가능)          |
| Day of week  | 0–6  | 요일 (0 = 일요일, Sun, Mon 등 가능) |

**특수 문자**

| 문자 | 의미         | 예시            |
| ---- | ------------ | --------------- |
| `*`  | 매번         | 매 분, 매 시 등 |
| `,`  | 여러 값 나열 | `1,3,5`         |
| `-`  | 범위         | `1-5`           |
| `/`  | 스텝         | `*/5` → 5마다   |

**예시**

- `30 2 * * *` — 매일 02:30 (UTC)
- `0 */2 * * *` — 2시간마다
- `0 9-17 * * 1-5` — 월–금 09:00–17:00 매시 정각
- `*/15 * * * *` — 15분마다
- `0 0 1,15 * *` — 매월 1일, 15일 자정

이 예시에서는 `*/5 * * * *` 선택 후 **Next** 클릭.
