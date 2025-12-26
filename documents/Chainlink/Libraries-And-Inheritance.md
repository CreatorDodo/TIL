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
