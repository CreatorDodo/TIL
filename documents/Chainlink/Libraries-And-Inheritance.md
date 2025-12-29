# 스마트 컨트랙트 라이브러리와 상속

## 소개

Solidity 기초를 배운 후에는 더 효율적인 코드를 작성하고 중복 작업을 피하고 싶을 것입니다. **라이브러리(Libraries)**와 **상속(Inheritance)**이라는 두 가지 강력한 기능이 이를 도와줍니다. 이 개념들을 통해 코드를 재사용하고 외부 의존성을 활용할 수 있어, 컨트랙트를 더 깔끔하고 안전하며 배포 비용도 저렴하게 만들 수 있습니다.

## 언제 사용해야 할까?

| 기능       | 최적 용도             | 주요 장점                             | 제한 사항                     |
| ---------- | --------------------- | ------------------------------------- | ----------------------------- |
| 라이브러리 | 유틸리티 함수 및 연산 | 한 번 배포하고 여러 컨트랙트에서 사용 | 상태 변수 저장 불가           |
| 상속       | 기존 컨트랙트 확장    | 검증된 코드 위에 구축                 | 다중 부모 시 복잡해질 수 있음 |

---

## 스마트 컨트랙트 라이브러리

라이브러리는 여러 컨트랙트에서 공유할 수 있는 재사용 가능한 코드 조각입니다. 컨트랙트가 사용할 수 있는 유용한 함수들이 담긴 도구 상자라고 생각하면 됩니다.

### 간단한 라이브러리 만들기

어떤 컨트랙트든 사용할 수 있는 기본 수학 라이브러리입니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library MathUtils {
    // 두 숫자 중 작은 값 찾기
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    // 두 숫자 중 큰 값 찾기
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }
}
```

### 컨트랙트에서 라이브러리 사용하기

라이브러리 함수를 사용하는 두 가지 방법이 있습니다:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MathUtils.sol"; // 라이브러리 임포트

contract Calculator {
    // 라이브러리 함수를 uint256에 연결
    using MathUtils for uint256;

    // 방법 1: 라이브러리 함수로 직접 호출
    function getMinimum(uint256 a, uint256 b) public pure returns (uint256) {
        return MathUtils.min(a, b);
    }

    // 방법 2: 연결된 함수로 호출
    function getMaximum(uint256 a, uint256 b) public pure returns (uint256) {
        return a.max(b); // MathUtils.max(a, b)와 동일
    }
}
```

### 라이브러리의 장점

- **한 번 작성, 어디서나 사용**: 코드를 한 곳에서 정의하고 여러 컨트랙트에서 사용
- **가스 절약**: internal 함수가 있는 라이브러리는 컨트랙트의 바이트코드에 포함되고, external 라이브러리 함수는 별도로 배포되어 여러 컨트랙트에서 재사용 가능
- **상태 변수 없음**: 라이브러리는 상태 변수를 가질 수 없어 순수 유틸리티 함수에 적합

### 라이브러리 유형

- **임베디드 라이브러리**: internal 함수를 사용하며 컨트랙트 코드에 복사됨
- **링크드 라이브러리**: external과 public 함수를 사용. 이 함수들은 컨트랙트의 바이트코드에 복사되지 않고, 컨트랙트가 배포된 라이브러리를 호출함

---

## 컨트랙트 상속

상속은 한 컨트랙트가 다른 컨트랙트 위에 구축할 수 있게 해줍니다. 블록 쌓기처럼 생각하면 됩니다—기초부터 시작해서 더 많은 기능을 추가합니다.

### 기본 상속 예제

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 핵심 기능이 있는 기본 컨트랙트
contract BaseToken {
    string public name;
    uint256 public totalSupply;

    constructor(string memory _name) {
        name = _name;
        totalSupply = 1000000;
    }

    function getInfo() public virtual view returns (string memory) {
        return string.concat("Token: ", name);
    }
}

// BaseToken을 상속하고 확장하는 컨트랙트
contract GoldToken is BaseToken {
    constructor() BaseToken("Gold Token") {}

    // 새로운 기능 추가
    function getSymbol() public pure returns (string memory) {
        return "GLD";
    }
}
```

이 예제에서 `GoldToken`은 `BaseToken`의 모든 기능을 상속받고 새로운 함수를 추가합니다.

---

## 함수 오버라이딩

때때로 부모 컨트랙트의 동작을 수정하고 싶을 수 있습니다. 이때 함수 오버라이딩을 사용합니다.

### 기본 함수 오버라이딩

함수를 오버라이드하려면:

1. 부모 함수에 `virtual` 표시 ("변경 가능"을 의미)
2. 자식 함수에 `override` 표시 ("이것을 변경함"을 의미)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BaseToken {
    // virtual 키워드는 이 함수가 오버라이드될 수 있음을 허용
    function getTokenName() public virtual pure returns (string memory) {
        return "BaseToken";
    }
}

contract CustomToken is BaseToken {
    // override 키워드는 부모의 함수를 대체하고 있음을 표시
    function getTokenName() public override pure returns (string memory) {
        return "CustomToken";
    }
}
```

### `super`로 부모 함수 호출하기

때때로 함수를 완전히 대체하기보다 확장하고 싶을 수 있습니다:

```solidity
contract ExtendedToken is BaseToken {
    function getTokenName() public override pure returns (string memory) {
        // super 키워드를 사용해 부모 함수를 호출하고 추가
        return string.concat(super.getTokenName(), " Plus");
        // "BaseToken Plus" 반환
    }
}
```

---

## 다중 상속

Solidity는 컨트랙트가 여러 부모로부터 상속받을 수 있지만, 신중한 처리가 필요합니다.

### 간단한 다중 상속 예제

```solidity
contract Mintable {
    function canMint() public virtual pure returns (bool) {
        return true;
    }
}

contract Burnable {
    function canBurn() public virtual pure returns (bool) {
        return true;
    }
}

// 두 컨트랙트 모두 상속
contract Token is Mintable, Burnable {
    // 이 컨트랙트는 이제 canMint()와 canBurn() 함수를 모두 가짐
}
```

### 부모 컨트랙트에 같은 이름의 함수가 있을 때

여러 부모가 같은 이름의 함수를 가지면, 어떤 것을 오버라이드하는지 명시해야 합니다:

```solidity
contract BaseA {
    function getValue() public virtual pure returns (string memory) {
        return "A";
    }
}

contract BaseB {
    function getValue() public virtual pure returns (string memory) {
        return "B";
    }
}

// 함수 이름 충돌이 있는 다중 상속
contract Combined is BaseB, BaseA {
    // 오버라이드되는 모든 컨트랙트를 명시해야 함
    function getValue() public override(BaseB, BaseA) pure returns (string memory) {
        return "Combined";
    }
}
```

### 중요 규칙: 상속 순서가 중요함

부모 컨트랙트를 나열하는 순서가 중요합니다:

```solidity
// BaseB가 상속 목록에서 먼저 옴
contract TokenX is BaseB, BaseA {
    function getValue() public override(BaseB, BaseA) pure returns (string memory) {
        // BaseB의 구현이 먼저 호출됨
        return super.getValue(); // "B" 반환
    }
}

// BaseA가 상속 목록에서 먼저 옴
contract TokenY is BaseA, BaseB {
    function getValue() public override(BaseA, BaseB) pure returns (string memory) {
        // BaseA의 구현이 먼저 호출됨
        return super.getValue(); // "A" 반환
    }
}
```

---
