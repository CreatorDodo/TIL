# Solidity Programming: A Guide for Blockchain Enthusiasts

블록체인, 스마트 컨트랙트, 그리고 Solidity가 이더리움 생태계에 어떻게 적용되는지 Blockchain Basics 코스를 통해 배웠습니다. 이제 프로그래밍 초보자도 자신만의 스마트 컨트랙트를 작성할 수 있도록 Solidity의 프로그래밍 측면에 집중해보겠습니다.

---

## 1. Solidity란?

Solidity는 스마트 컨트랙트 작성을 위한 **고수준 객체지향 프로그래밍 언어**입니다. C++, Python, JavaScript와 유사한 중괄호 기반 언어로, **EVM(Ethereum Virtual Machine)**에서 실행되도록 특별히 설계되었습니다. 탈중앙화 애플리케이션(dApps)과 블록체인 기반 프로토콜 개발의 주요 언어입니다.

### 주요 특징

| 특징                         | 설명                                                 |
| ---------------------------- | ---------------------------------------------------- |
| **정적 타이핑**              | 변수 타입이 컴파일 시점에 결정됨                     |
| **상속**                     | 컨트랙트가 다른 컨트랙트의 속성과 메서드를 상속 가능 |
| **사용자 정의 타입**         | Struct, Mapping, Enum을 통한 커스텀 데이터 구조      |
| **라이브러리 지원**          | 재사용 가능한 모듈식 코드                            |
| **스마트 컨트랙트 상호작용** | 블록체인 상의 다른 컨트랙트와 쉽게 통신              |
| **저수준 EVM 접근**          | 인라인 어셈블리(`assembly`)를 통한 최적화된 성능     |

---

## 2. Solidity 코드 구조

모든 Solidity 스마트 컨트랙트는 일관된 구조를 따릅니다.

### 2.1 라이선스 식별자

다른 사람들이 코드를 어떻게 사용할 수 있는지 SPDX 라이선스 식별자로 명시합니다:

```solidity
// SPDX-License-Identifier: MIT
```

### 2.2 버전 프라그마

코드가 호환되는 Solidity 버전을 선언합니다:

```solidity
pragma solidity ^0.8.19;
```

- `^` 기호: 이 버전 또는 다음 주요 버전 이전까지의 호환되는 새 버전
- 정확한 버전 지정: `pragma solidity 0.8.19;`
- 범위 지정: `pragma solidity >=0.8.19 <0.9.0;`

### 2.3 컨트랙트 선언

메인 코드는 컨트랙트 선언 내에 포함됩니다:

```solidity
contract MyContract {
    // 컨트랙트 코드 작성
}
```

> 💡 컨트랙트를 **설계도(blueprint)**로 생각하세요. 컨트랙트가 무엇을 알고 있는지(상태)와 무엇을 할 수 있는지(함수)를 정의합니다.

---

## 3. 프로그래밍 기초

### 3.1 변수: 정보 저장

변수는 데이터 값을 담는 이름이 있는 컨테이너입니다. Solidity에서 각 변수는 저장할 수 있는 데이터 종류를 정의하는 특정 타입을 가져야 하며, 위치(storage, memory, calldata)에 따라 데이터가 저장되는 곳이 결정됩니다.

#### 상태 변수 (State Variables)

블록체인의 storage에 영구적으로 저장됩니다:

```solidity
contract StorageExample {
    uint256 public myNumber = 42;       // 숫자
    string public myText = "Hello";      // 텍스트
    bool public isActive = true;         // true/false 값
    address public owner;                // 이더리움 주소
    uint256 private secretNumber;        // private 숫자
}
```

> 📌 명확성을 위해 storage 변수에 `s_` 접두사를 사용하기도 합니다 (예: `s_balance`, `s_owner`)

#### 상태 변수 가시성 (Visibility)

| 가시성     | 설명                                                                 |
| ---------- | -------------------------------------------------------------------- |
| `public`   | 누구나 읽을 수 있고, Solidity가 자동으로 getter 함수 생성            |
| `private`  | 현재 컨트랙트 내에서만 접근 가능 (블록체인에서 완전히 비공개는 아님) |
| `internal` | 현재 컨트랙트와 상속받은 컨트랙트에서 접근 가능 (기본값)             |

```solidity
uint256 public counter = 0;           // counter() 함수 자동 생성
uint256 private password = 123456;    // 다른 컨트랙트에서 접근 불가
uint256 internal sharedSecret = 42;   // 자식 컨트랙트에서 접근 가능
```

#### Constant와 Immutable 변수

가스 비용을 줄이고 보안을 개선할 수 있는 두 가지 특별한 상태 변수:

**Constant 변수:**

```solidity
contract TokenContract {
    uint256 public constant DECIMAL_PLACES = 18;
    string public constant TOKEN_NAME = "My Token";
    address public constant DEAD_ADDRESS = 0x000000000000000000000000000000000000dEaD;
}
```

- ✅ 선언 시 값 할당 필수
- ✅ 컴파일 시점에 값 설정
- ✅ 배포 후 변경 불가
- ✅ storage 슬롯 미사용 (가스 절약)
- ✅ 값 타입과 string만 가능
- ✅ 대문자로 명명 (관례)

**Immutable 변수:**

```solidity
contract TokenContract {
    address public immutable deployer;
    uint256 public immutable deploymentTime;

    constructor() {
        deployer = msg.sender;
        deploymentTime = block.timestamp;
    }
}
```

- ✅ 생성자에서 또는 선언 시 할당 가능
- ✅ 생성 후 변경 불가
- ✅ 일반 상태 변수보다 가스 효율적
- ✅ constant보다는 덜 효율적
- ✅ 값 타입만 가능 (string이나 참조 타입 불가)

**사용 시기:**

| 상황                                         | 사용할 타입    |
| -------------------------------------------- | -------------- |
| 컴파일 시점에 알려진 값                      | `constant`     |
| 배포 조건에 따라 달라지지만 이후 변경 불필요 | `immutable`    |
| 컨트랙트 수명 동안 변경 필요                 | 일반 상태 변수 |

---

### 3.2 데이터 타입

Solidity는 **값 타입(Value Types)**과 **참조 타입(Reference Types)** 두 가지 주요 카테고리가 있습니다.

#### 값 타입 (Value Types)

데이터를 직접 저장합니다. 다른 변수에 할당하면 값의 복사본을 얻습니다:

```solidity
uint a = 5;
uint b = a;    // b는 5의 복사본을 가짐
b = 10;        // a는 여전히 5, b는 10
```

| 타입      | 설명                       | 예시                                         |
| --------- | -------------------------- | -------------------------------------------- |
| `uint`    | 부호 없는 정수 (양수만)    | `uint256 public score = 100;`                |
| `int`     | 부호 있는 정수 (음수 가능) | `int256 public temperature = -5;`            |
| `bool`    | 불리언                     | `bool public isComplete = false;`            |
| `address` | 이더리움 주소              | `address public contractCreator = 0x123...;` |
| `bytes`   | 고정 크기 바이트 배열      | `bytes32 public dataHash = 0xabcd...;`       |

> 📌 `uint256`의 최대값: 2^256-1, `int256`의 최대값: 2^255-1 (부호 저장 필요)

#### 참조 타입 (Reference Types)

데이터를 직접 저장하지 않고 데이터 위치에 대한 "포인터"를 저장합니다:

| 타입      | 설명                         | 예시                                           |
| --------- | ---------------------------- | ---------------------------------------------- |
| `string`  | 텍스트 값                    | `string public message = "Welcome!";`          |
| `array`   | 같은 타입 항목의 정렬된 목록 | `uint256[] public scores = [85, 90, 95];`      |
| `mapping` | 키-값 쌍                     | `mapping(address => uint256) public balances;` |
| `struct`  | 관련 데이터의 커스텀 그룹    | 아래 참조                                      |
| `bytes`   | 가변 길이 바이트 배열        | `bytes public dynamicData;`                    |

```solidity
struct Person {
    string name;
    uint256 age;
    address walletAddress;
}
```

---

### 3.3 포인터와 데이터 위치 이해

#### 포인터란?

포인터는 데이터 자체가 아닌 다른 데이터의 메모리 주소/위치를 저장하는 변수입니다. 데이터가 있는 곳을 가리키는 이정표라고 생각하세요.

#### 포인터 예시

```solidity
contract PointerExample {
    uint256[] public storageArray = [1, 2, 3];

    function manipulateArray() public {
        // storage 배열에 대한 포인터 생성
        uint256[] storage storageArrayPointer = storageArray;

        // 포인터를 통해 실제 storage 배열 수정
        storageArrayPointer[0] = 100;
        // storageArray는 이제 [100, 2, 3]

        // memory에 복사본 생성 (포인터가 아님)
        uint256[] memory memoryArray = storageArray;

        // memory 복사본만 수정, storage 배열은 변경 안됨
        memoryArray[1] = 200;
        // storageArray는 여전히 [100, 2, 3]
        // memoryArray는 [100, 200, 3]
    }
}
```

#### 저장 위치 (Storage Locations)

| 위치       | 설명                                | 특징                                        |
| ---------- | ----------------------------------- | ------------------------------------------- |
| `storage`  | 블록체인에 영구 저장                | 가장 비싼 가스 비용, 상태 변수에 사용       |
| `memory`   | 함수 실행 중 임시 저장              | 저렴, 함수 매개변수/반환값/지역 변수에 사용 |
| `calldata` | 함수 매개변수용 읽기 전용 임시 저장 | 가장 효율적, 수정 불가                      |

```solidity
uint256[] permanentArray;  // storage에 저장

function processArray(uint256[] calldata inputValues) external {
    // inputValues는 calldata에 존재 - 수정 불가

    // memory의 지역 변수 - 임시 복사본
    uint256[] memory tempArray = new uint256[](inputValues.length);
    for (uint i = 0; i < inputValues.length; i++) {
        tempArray[i] = inputValues[i] * 2;
    }

    // storage 참조 - 변경 사항이 영구 저장됨
    uint256[] storage myStorageArray = permanentArray;
    myStorageArray.push(tempArray[0]);
}
```

**권장 사항:**

- `calldata`: 가능하면 external 함수 매개변수에 사용 (가장 효율적)
- `memory`: 수정이 필요한 함수 매개변수에 사용
- `storage`: 상태 변수 수정이 필요할 때 사용

---

## 4. 함수: 동작 수행

함수는 특정 동작을 수행하는 코드 블록입니다:

```solidity
contract Counter {
    uint256 public count = 0;

    function increment() public {
        count = count + 1;  // count += 1; 도 가능
    }

    function decrement() public {
        count = count - 1;  // count -= 1; 도 가능
    }
}
```

### 4.1 함수 구성 요소

```solidity
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

| 구성 요소       | 설명                                 |
| --------------- | ------------------------------------ |
| **이름**        | `add` - 함수를 호출할 때 사용        |
| **매개변수**    | `(uint256 a, uint256 b)` - 입력 값   |
| **가시성**      | `public` - 누가 호출할 수 있는지     |
| **상태 변경자** | `pure` - 상태를 읽거나 수정하지 않음 |
| **반환값**      | `returns (uint256)` - 출력 타입      |
| **함수 본문**   | `{ return a + b; }` - 실행 코드      |

### 4.2 함수 가시성

| 가시성     | 설명                                                  |
| ---------- | ----------------------------------------------------- |
| `public`   | 누구나 호출 가능                                      |
| `private`  | 이 컨트랙트만 호출 가능                               |
| `internal` | 이 컨트랙트와 상속받은 컨트랙트만 호출 가능           |
| `external` | 컨트랙트 외부에서만 호출 가능 (특정 용도에 더 효율적) |

### 4.3 특수 함수 타입

**view**: 상태를 읽을 수 있지만 수정 불가

```solidity
function getCount() public view returns (uint256) {
    return count;
}
```

**pure**: 상태를 읽거나 수정 불가

```solidity
function addNumbers(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}
```

**constructor**: 컨트랙트 배포 시 단 한 번만 실행

```solidity
constructor() {
    owner = msg.sender;
}
```

**payable**: 이더를 받을 수 있는 함수

```solidity
mapping(address => uint256) balances;

function sendMeMoney() public payable {
    balances[msg.sender] += msg.value;
}
```

---

## 5. 트랜잭션 컨텍스트와 전역 변수

Solidity는 특별한 내장 변수를 통해 트랜잭션 정보와 블록체인 데이터에 접근할 수 있습니다.

### 5.1 트랜잭션 컨텍스트 변수

#### msg.sender

현재 함수를 호출한 주소 (지갑 주소 또는 다른 컨트랙트):

```solidity
contract OwnerExample {
    address public owner;

    constructor() {
        owner = msg.sender;  // 배포자가 owner가 됨
    }
}
```

#### msg.value

함수 호출과 함께 전송된 ETH 양 (wei 단위):

```solidity
contract PaymentExample {
    mapping(address => uint256) public payments;

    function makePayment() public payable {
        require(msg.value > 0, "Must send some ETH");
        payments[msg.sender] += msg.value;
    }
}
```

#### msg.data

트랜잭션의 전체 calldata (함수 시그니처와 인자 포함):

```solidity
contract DataExample {
    bytes public lastCallData;

    function recordCallData() public {
        lastCallData = msg.data;
    }
}
```

### 5.2 블록 정보 변수

#### block.timestamp

현재 블록의 타임스탬프 (Unix epoch 이후 초):

```solidity
contract TimestampExample {
    uint256 public contractCreationTime;

    constructor() {
        contractCreationTime = block.timestamp;
    }

    function hasDurationPassed(uint256 durationInSeconds) public view returns (bool) {
        return (block.timestamp >= contractCreationTime + durationInSeconds);
    }
}
```

> ⚠️ 정밀한 타이밍에 의존하지 마세요 (채굴자가 어느 정도 유연성을 가짐)

#### block.number

현재 블록 번호:

```solidity
contract BlockNumberExample {
    uint256 public deploymentBlockNumber;

    constructor() {
        deploymentBlockNumber = block.number;
    }

    function getBlocksPassed() public view returns (uint256) {
        return block.number - deploymentBlockNumber;
    }
}
```

### 5.3 실제 예시: 시간 잠금 지갑

```solidity
contract TimeLockedWallet {
    address public owner;
    uint256 public unlockTime;

    event Deposit(address indexed sender, uint256 amount, uint256 timestamp);
    event Withdrawal(uint256 amount, uint256 timestamp);

    constructor(uint256 _unlockDuration) {
        owner = msg.sender;
        unlockTime = block.timestamp + _unlockDuration;
    }

    function deposit() public payable {
        require(msg.value > 0, "Must deposit some ETH");
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public {
        require(msg.sender == owner, "You are not the owner");
        require(block.timestamp >= unlockTime, "Funds are still locked");
        require(address(this).balance > 0, "No funds to withdraw");

        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);

        emit Withdrawal(balance, block.timestamp);
    }

    function withdrawalStatus() public view returns (bool canWithdraw, uint256 remainingTime) {
        if (block.timestamp >= unlockTime) {
            return (true, 0);
        } else {
            return (false, unlockTime - block.timestamp);
        }
    }
}
```

---

## 6. 제어 구조

### 6.1 조건문 (if/else)

```solidity
function checkValue(uint256 value) public pure returns (string memory) {
    if (value > 100) {
        return "Value is greater than 100";
    } else if (value == 100) {
        return "Value is exactly 100";
    } else {
        return "Value is less than 100";
    }
}
```

### 6.2 반복문

```solidity
function sumArray(uint256[] memory numbers) public pure returns (uint256) {
    uint256 total = 0;

    for (uint i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    return total;
}
```

> ⚠️ **주의**: 각 연산은 가스를 소비하고, 반복이 너무 많으면 블록 가스 한도를 초과할 수 있습니다. 이를 **서비스 거부(DoS)** 공격이라고 합니다.

---

## 7. 에러 처리

### 7.1 Require 문

조건을 확인하고 실패하면 트랜잭션을 되돌립니다:

```solidity
function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}
```

### 7.2 커스텀 에러 (권장)

가스 효율성을 위해 커스텀 에러를 정의하세요:

```solidity
error InsufficientBalance(address user, uint256 balance, uint256 withdrawAmount);

function withdraw(uint256 amount) public {
    if (balances[msg.sender] < amount) {
        revert InsufficientBalance(msg.sender, balances[msg.sender], amount);
    }
    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);
}
```

---

## 8. 이벤트: 외부 세계와 통신

이벤트는 중요한 일이 발생했을 때 컨트랙트가 하는 알림입니다. 상태가 업데이트될 때 이벤트를 발생시켜야 합니다:

```solidity
contract Token {
    event Transfer(address indexed from, address indexed to, uint256 amount);

    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }
}
```

> 📌 `indexed` 키워드는 나중에 특정 이벤트를 검색하기 쉽게 만듭니다.

---

## 9. 모디파이어: 재사용 가능한 함수 조건

모디파이어는 함수에 대한 재사용 가능한 로직을 만드는 방법입니다:

```solidity
contract Owned {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;  // 이 자리표시자가 함수 코드로 대체됨
    }

    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
```

> 📌 모디파이어의 `_`는 함수 코드가 실행될 위치를 나타냅니다. `_`가 모디파이어 로직 전에 있으면 함수가 먼저 실행됩니다.

---

## 10. 인터페이스

인터페이스는 컨트랙트가 구현해야 하는 함수를 정의하는 **청사진** 역할을 합니다 (구현 방법은 명시하지 않음).

### 인터페이스 특징

- ❌ 함수 구현 불가
- ❌ 상태 변수 불가
- ❌ 생성자 불가
- ❌ 다른 컨트랙트 상속 불가
- ✅ 함수 시그니처만 선언

### 예시

```solidity
interface IPayable {
    function pay(address recipient, uint256 amount) external returns (bool);
    function getBalance(address account) external view returns (uint256);
}

contract PaymentProcessor is IPayable {
    mapping(address => uint256) private balances;

    function pay(address recipient, uint256 amount) external override returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }

    function getBalance(address account) external view override returns (uint256) {
        return balances[account];
    }
}
```

> 💡 인터페이스는 알 수 없는 컨트랙트와 상호작용할 때 특히 유용합니다. 호출할 수 있는 함수와 호출 방법만 알면 됩니다.

---

## 11. 프로그래밍 모범 사례

| 원칙                       | 설명                                      |
| -------------------------- | ----------------------------------------- |
| **단순하게 유지**          | 복잡한 코드는 보안하기 어려움             |
| **상태 변경 전 조건 확인** | require 또는 커스텀 에러로 모든 입력 검증 |
| **명확한 이름 사용**       | 코드를 이해하기 쉽게 작성                 |
| **코드 주석 작성**         | 무엇을 하는지가 아니라 왜 하는지 설명     |
| **가스 비용 인식**         | 모든 연산은 가스 비용 발생                |

### 명명 규칙

| 대상                       | 스타일           | 예시          |
| -------------------------- | ---------------- | ------------- |
| 컨트랙트                   | PascalCase       | `SimpleToken` |
| 함수/변수                  | camelCase        | `balanceOf`   |
| Private/Internal 상태 변수 | `_` 접두사       | `_owner`      |
| Constant                   | UPPER_SNAKE_CASE | `MAX_SUPPLY`  |

---

## 12. ABI (Application Binary Interface)

ABI는 애플리케이션에게 블록체인의 컨트랙트와 정확히 어떻게 통신해야 하는지 알려주는 **스마트 컨트랙트의 사용 설명서**입니다.

### ABI가 필요한 이유

배포된 스마트 컨트랙트와 통신할 때 웹사이트나 애플리케이션은 다음을 알아야 합니다:

- 어떤 함수가 존재하는지
- 각 함수에 필요한 매개변수
- 반환되는 데이터 타입

### ABI의 역할

- ✅ 스마트 컨트랙트의 함수 호출
- ✅ 함수 인자 인코딩
- ✅ 반환 데이터 디코딩
- ✅ 블록체인 외부에서 컨트랙트와 상호작용

### ABI 형식

ABI는 컨트랙트에서 공개적으로 보이는 모든 것을 설명하는 JSON 배열입니다:

```solidity
// Solidity 스마트 컨트랙트
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleMath {
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }
}
```

컴파일 후 생성되는 ABI:

```json
[
  {
    "inputs": [
      { "internalType": "uint256", "name": "a", "type": "uint256" },
      { "internalType": "uint256", "name": "b", "type": "uint256" }
    ],
    "name": "add",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "pure",
    "type": "function"
  }
]
```

### 실제 사용 예시 (ethers.js)

```javascript
const contract = new ethers.Contract(contractAddress, contractABI, provider);
await contract.deposit(100);
```

---

## 13. 다음 단계

1. **간단한 컨트랙트로 연습**: 기존 예제 수정부터 시작
2. **Remix IDE 사용**: https://remix.ethereum.org - 브라우저 기반 개발 환경
3. **다른 컨트랙트 읽기**: 기존 코드에서 배우기
4. **OpenZeppelin 탐구**: 잘 작성되고 안전한 컨트랙트 학습
5. **가스 최적화 학습**: 연산 비용 이해
6. **단계별 진행**: 처음부터 복잡한 애플리케이션 구축 시도하지 않기

> 💡 프로그래밍은 연습으로 발전하는 기술입니다. 작은 프로젝트부터 시작해서 점차 복잡한 솔루션으로 나아가세요.
