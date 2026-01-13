# ERC-721 NFT 토큰 빌딩 가이드

## Open Zeppelin Contracts Wizard 소개

Open Zeppelin Contracts Wizard는 OpenZeppelin Contracts를 기반으로 한 대화형 스마트 컨트랙트 생성 도구입니다.

이 가이드에서는 간단한 ERC-721 NFT 컨트랙트를 생성하는 방법을 다룹니다.

---

## 컨트랙트 타입 선택

Wizard를 처음 열면 ERC-20, ERC-721, ERC-1155, Governor, Custom 등 다양한 컨트랙트 타입을 선택할 수 있는 인터페이스가 표시됩니다.

NFT 토큰 표준인 **ERC-721** 옵션을 선택합니다.

---

## 컨트랙트 설정

왼쪽의 **Settings** 탭에서 NFT 컨트랙트의 다양한 기능을 설정할 수 있습니다.

### 주요 설정 옵션

- **Name**: NFT 컬렉션의 이름
- **Symbol**: NFT 컬렉션의 심볼 (예: "MYNFT")
- **Mintable**: 민팅 가능 여부 설정
- **Auto-increment Ids**: 토큰 ID 자동 증가 기능

---

## 자동 코드 생성

다양한 옵션을 클릭하면 코드가 자동으로 채워집니다. 이를 통해 컨트랙트 템플릿을 빠르고 쉽게 생성할 수 있습니다.

## 참고 자료

- [Open Zeppelin Contracts Wizard](https://wizard.openzeppelin.com/)
- [ERC-721 토큰 표준](https://eips.ethereum.org/EIPS/eip-721)
