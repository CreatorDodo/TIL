# Introduction to Remix

이 과정에서는 Remix를 사용하여 스마트 컨트랙트를 작성, 컴파일, 배포 및 상호작용합니다. Chainlink 서비스를 사용하기 전에 Remix에 익숙해지도록 미리 살펴봅니다.

## What is Remix

[Remix](https://remix.ethereum.org/)는 스마트 컨트랙트 개발을 위해 특별히 설계된 온라인 통합 개발 환경(IDE)입니다. Solidity 스마트 컨트랙트를 작성, 컴파일, 배포 및 디버깅할 수 있는 사용하기 쉬운 인터페이스를 제공합니다. Remix는 단순성, 내장 도구 및 브라우저 기반 기능으로 널리 사용되며, 추가 소프트웨어 설치 없이 빠르게 시작할 수 있습니다.

### Key Features of Remix

| 기능                          | 설명                                                      |
| ----------------------------- | --------------------------------------------------------- |
| **File Explorer**             | 컨트랙트 파일 및 프로젝트 관리                            |
| **Solidity Compiler**         | 스마트 컨트랙트 컴파일 및 오류 검사                       |
| **Deploy & Run Transactions** | 로컬 또는 퍼블릭 EVM 네트워크에 컨트랙트 배포 및 상호작용 |
| **Debugger**                  | 트랜잭션을 단계별로 실행하여 디버그                       |
| **Plugin System**             | 추가 도구로 Remix 기능 확장                               |

---

## Navigating Remix

Remix를 열면 다음과 같은 중요한 섹션들이 보입니다:

1. **File Explorer** (왼쪽 패널): 워크스페이스 관리, 새 파일 생성, 컨트랙트 구성
2. **Editor** (중앙 패널): Solidity 스마트 컨트랙트 작성 및 수정
3. **Terminal** (하단 패널): 로그, 컴파일 메시지, 트랜잭션 세부 정보 확인
4. **Solidity Compiler** (사이드바): 다양한 Solidity 버전으로 스마트 컨트랙트 컴파일
5. **Deploy & Run Transactions** (사이드바): 블록체인에 컨트랙트 배포 및 상호작용

---

## Creating Workspaces, Folders, and Files

Remix에서는 프로젝트를 구성하기 위해 다양한 **워크스페이스**를 만들 수 있습니다. GitHub 저장소나 컴퓨터의 프로젝트 폴더와 비슷합니다.

### 1. 새 Workspace 생성

1. **File Explorer** 패널 상단에서 **Workspaces** 액션 버튼(햄버거 아이콘) 클릭
2. **Create blank** 선택하여 새 워크스페이스 생성
3. 워크스페이스 이름 지정 (예: "CLF")
4. **Ok** 클릭

### 2. 새 폴더 생성

1. 파일 탐색기 사이드바에서 우클릭 → **New Folder** 클릭
2. 폴더 이름: `contracts`

### 3. 새 파일 생성

1. `contracts` 폴더에서 우클릭 → **New file** 클릭
2. 파일 이름: `MyERC20.sol`

---

## Compiling Smart Contracts

스마트 컨트랙트를 배포하기 전에 오류 검사와 필요한 바이트코드 생성을 위해 컴파일해야 합니다.

### How to Compile a Contract

1. Remix에서 **Solidity Compiler** 패널 열기
2. 올바른 Solidity 버전 선택 (컨트랙트와 일치하는 버전)
3. 메인 창에서 컨트랙트 파일이 열려 있는지 확인하고 **Compile [YourContract.sol]** 클릭
4. 오류가 있으면 터미널에 표시됨

> 💡 **팁**: `Cmd + S` (Mac) 또는 `Ctrl + S` (Windows)로도 컴파일 가능합니다.

오류가 없으면 컨트랙트가 성공적으로 컴파일되고 **녹색 체크마크**가 표시됩니다.

### ABI 가져오기

컴파일 시 컴파일러가 ABI를 생성합니다. ABI를 가져오려면 (검증 또는 프론트엔드 애플리케이션용):

1. **Solidity Compiler** 탭에서 아래로 스크롤
2. **ABI** 버튼 클릭

---

## Connecting to MetaMask

실제 블록체인(예: Ethereum Mainnet, Sepolia, Polygon)에 컨트랙트를 배포하려면 Remix를 MetaMask에 연결해야 합니다.

### Steps to Connect

1. MetaMask를 열고 원하는 네트워크에 있는지 확인
2. Remix에서 **Deploy & Run Transactions** 패널로 이동
3. 환경으로 **Injected Provider - MetaMask** 선택
4. MetaMask가 지갑 연결 및 승인을 요청함

---
