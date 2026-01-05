# Writing an ERC20 Token Contract

이 튜토리얼에서는 첫 번째 스마트 컨트랙트를 작성합니다! OpenZeppelin을 사용하여 ERC-20 토큰 컨트랙트를 만들고, 특정 주소만 토큰을 발행할 수 있도록 권한을 추가하는 방법을 배웁니다.

## ERC-20이란?

ERC-20은 이더리움 블록체인에서 **대체 가능한 토큰(Fungible Token)**을 위한 기술 표준입니다.

- **ERC**: "Ethereum Request for Comment"의 약자로, 이더리움 개선 제안의 명명 규칙
- **20**: 이 표준을 만든 제안 번호

### ERC-20 토큰의 특징

ERC-20 토큰은 이 표준에 정의된 특정 규칙을 따르는 암호화폐입니다:

- 토큰 전송 함수
- 잔액 확인 함수
- 제3자의 지출 승인 함수

이러한 표준화된 함수들은 ERC-20 토큰이 이더리움 생태계 전반에서 일관되게 작동하도록 보장하여, 쉽게 교환하고, 지갑에 저장하며, 탈중앙화 거래소에서 거래할 수 있게 합니다.

**대표적인 예시**: USDT (Tether), USDC, DAI 등

---

## 간단한 ERC20 토큰 작성하기

Remix를 사용하여 ERC-20 토큰 컨트랙트를 작성합니다.

### 1단계: Remix에서 새 Workspace 생성

1. **File Explorer** 패널 상단에서 **Workspaces** 액션 버튼(햄버거 아이콘) 클릭
2. **Create blank** 선택하여 새 워크스페이스 생성
3. 워크스페이스 이름 지정 (예: "CLF")
4. **Ok** 클릭

![create-blank-workspace](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/create-blank-workspace.png)

### 2단계: 새 폴더 생성

1. 파일 탐색기 사이드바에서 우클릭 → **New Folder** 클릭
2. 폴더 이름: `contracts`

### 3단계: 새 파일 생성

1. `contracts` 폴더에서 우클릭 → **New file** 클릭
2. 파일 이름: `MyERC20.sol`

![file-explorer](/chainlink-fundamentals/2-smart-contract-and-solidity-fundamentals/assets/file-explorer.png)

### 4단계: 코드 작성

다음 토큰 컨트랙트 코드를 복사하여 붙여넣습니다:

> 💡 [OpenZeppelin Wizard](https://wizard.openzeppelin.com/)를 사용하여 토큰을 생성할 수도 있습니다. 또한 [course code repo](https://github.com/ciaranightingale/chainlink-fundamentals-code/blob/main/data-feeds/MyERC20.sol)에서 코드를 가져올 수 있습니다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ERC20 } from "@openzeppelin/contracts@5.2.0/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    constructor() ERC20("My Cyfrin CLF Token", "CLF") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

### 코드 설명

1. **OpenZeppelin ERC20 상속**: `import`로 가져오고 `is` 키워드로 상속

2. **생성자에서 부모 ERC20 생성자 호출**:

```solidity
constructor() ERC20("My Cyfrin CLF Token", "CLF") {}
```

3. **토큰 공급을 위한 public `mint` 함수 추가**:

```solidity
function mint(address to, uint256 amount) public {
    _mint(to, amount);
}
```

---

## Access Control 추가하기

현재 `MyERC20` 컨트랙트의 `mint` 함수는 **누구나 호출**할 수 있어서 무료로 토큰을 발행할 수 있습니다. 이를 변경하여 특정 주소에만 토큰 발행 권한을 부여하겠습니다.

### OpenZeppelin AccessControl 사용하기

OpenZeppelin의 `AccessControl` 스마트 컨트랙트를 사용하여 접근 제어를 추가합니다.

#### Roles 작동 방식

1. 각 역할(Role)에는 **역할 식별자(role identifier)**가 필요
2. 역할 식별자는 `bytes32` `constant` 변수
3. 관례적으로 역할 이름의 해시된 문자열 사용 (상수이므로 대문자)

```solidity
bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
```

#### AccessControl 주요 함수

| 함수         | 설명                             |
| ------------ | -------------------------------- |
| `grantRole`  | 역할 부여                        |
| `hasRole`    | 주소가 역할을 가지고 있는지 확인 |
| `revokeRole` | 역할 취소                        |

---

## Token Contract에 Minter Role 추가하기

### Step 1: AccessControl 컨트랙트 상속

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import { AccessControl } from "@openzeppelin/contracts@4.6.0/access/AccessControl.sol";

contract MyERC20 is ERC20, AccessControl {
    constructor() ERC20("My Cyfrin CLF Token", "CLF") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

### Step 2: 역할 식별자 생성

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import { AccessControl } from "@openzeppelin/contracts@4.6.0/access/AccessControl.sol";

contract MyERC20 is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("My Cyfrin CLF Token", "CLF") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

### Step 3: onlyRole modifier 추가

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import { AccessControl } from "@openzeppelin/contracts@4.6.0/access/AccessControl.sol";

contract MyERC20 is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("My Cyfrin CLF Token", "CLF") {}

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
```

이제 `MINTER_ROLE`을 가진 주소만 `mint` 함수를 호출할 수 있습니다!

---

## DEFAULT_ADMIN 역할 부여하기

현재 `MINTER_ROLE`을 부여할 방법이 없습니다. OpenZeppelin의 `AccessControl`에는 다른 주소에 역할을 부여할 수 있는 **`DEFAULT_ADMIN`** 역할이 있습니다.

### 최종 코드

배포자(deployer)에게 생성자에서 `DEFAULT_ADMIN_ROLE`과 `MINTER_ROLE`을 모두 부여합니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts@4.6.0/token/ERC20/ERC20.sol";
import { AccessControl } from "@openzeppelin/contracts@4.6.0/access/AccessControl.sol";

contract MyERC20 is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("My Cyfrin CLF Token", "CLF") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
```

### 설명

- **`msg.sender`**: 생성자 컨텍스트에서 컨트랙트 배포자를 의미
- **`_grantRole`**: 역할과 역할을 부여할 주소를 인자로 받음
- **`DEFAULT_ADMIN_ROLE`**: 다른 주소에 역할을 부여할 수 있는 관리자 역할
- **`MINTER_ROLE`**: 토큰을 발행할 수 있는 역할

## 참고 자료

- [ERC-20 표준](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin ERC20](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20)
- [OpenZeppelin AccessControl](https://docs.openzeppelin.com/contracts/5.x/access-control)
- [Course Code Repository](https://github.com/ciaranightingale/chainlink-fundamentals-code)
