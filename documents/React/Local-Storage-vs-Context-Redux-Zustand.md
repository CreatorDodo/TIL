# Local Storage vs Context/Redux/Zustand 분석

## 개요

React에서 상태 관리를 위해 Context/Redux/Zustand 대신 Local Storage를 사용할 수 있는지에 대한 분석 글입니다.

## 1. Context/Redux/Zustand가 필요한 이유

### 문제점: Prop Drilling

- React는 계층적 구조로, 컴포넌트는 부모/자식과만 데이터를 공유할 수 있음
- 형제 컴포넌트 간에는 직접적인 데이터 공유가 불가능
- 상태를 공유하려면 "상태 끌어올리기(lifting state up)" 패턴을 사용해야 함

### 해결책: Context API

```jsx
// Prop drilling 방식
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <ToggleTheme
        isDarkMode={isDarkMode}
        onClick={() => setIsDarkMode(!isDarkMode)}
      />
      <SomeBeautifulContentComponent isDarkMode={isDarkMode} />
    </>
  );
};

// Context API 방식
const App = () => {
  return (
    <ThemeProvider>
      <ToggleTheme />
      <SomeBeautifulContentComponent />
    </ThemeProvider>
  );
};
```

### Context/Redux/Zustand의 목적

- **Prop drilling 방지**: 중간 컴포넌트들이 데이터를 전달만 하는 역할을 하지 않도록 함
- **상태 관리 체계화**: 복잡한 상태를 더 체계적으로 관리
- **불필요한 리렌더링 방지**: 상태 변경 시 필요한 컴포넌트만 리렌더링

## 2. Local Storage의 목적

### 데이터 영속성

- 브라우저 탭을 닫거나 새로고침해도 데이터가 유지됨
- 도메인별로 격리된 저장 공간 제공
- 브라우저가 삭제되기 전까지 데이터 보존

### 사용 사례

- 테마 설정 (다크/라이트 모드)
- 사용자 선호도 저장
- 폼 데이터 백업
- 브라우저 전용 게임의 상태 저장

## 3. Local Storage를 상태 관리로 사용할 때의 문제점

### 3.1 React와의 동기화 문제

- Local Storage 변경 시 React 상태가 자동으로 업데이트되지 않음
- `storage` 이벤트는 **다른 탭**에서만 발생함 (현재 탭에서는 발생하지 않음)

```javascript
// 이 코드는 다른 탭에서만 작동함
window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    setTheme(event.newValue);
  }
});
```

### 3.2 SSR(Server-Side Rendering) 문제

- Local Storage는 브라우저 API이므로 서버에서 접근 불가
- SSR 환경에서 `localStorage is not defined` 에러 발생
- 서버와 클라이언트 간 하이드레이션 불일치 문제

### 3.3 데이터 타입 제한

- 모든 데이터가 **문자열**로만 저장됨
- 객체나 배열을 저장하려면 JSON.stringify/parse 필요
- 타입 안전성 상실

### 3.4 에러 처리의 복잡성

- `JSON.parse()` 실패 시 앱 전체가 크래시될 수 있음
- `SecurityError`: 특정 보안 정책에서 발생 가능
- `QuotaExceededError`: 5MB 제한 초과 시 발생

```javascript
// 위험한 코드 - 앱이 크래시될 수 있음
const myState = JSON.parse(localStorage.getItem("my-state"));
```

### 3.5 네임스페이스 관리

- 도메인 전체에서 공유되는 전역 저장 공간
- 키 이름 충돌 위험
- 네임스페이싱 시스템 필요

## 4. Local Storage의 적절한 사용 사례

### ✅ 좋은 사용 사례

- **폼 데이터 백업**: 사용자가 실수로 페이지를 닫아도 데이터 복구 가능
- **테마 설정**: 간단한 사용자 선호도 저장
- **UI 상태 저장**: 사이드바 열림/닫힘, 활성 탭 등
- **탭 간 통신**: 여러 탭에서 실시간 동기화가 필요한 경우
- **미니 백엔드**: 로그인이 필요 없는 브라우저 전용 기능

### ❌ 부적절한 사용 사례

- **복잡한 상태 관리**: Redux/Zustand/Context가 더 적합
- **서버 상태 관리**: API 데이터 캐싱 등
- **실시간 동기화가 중요한 상태**: Local Storage는 동기화에 한계가 있음

## 5. 결론

### Local Storage는 상태 관리 도구가 아님

- Local Storage는 **데이터 영속성**을 위한 도구
- Context/Redux/Zustand는 **상태 공유**를 위한 도구
- 서로 다른 목적을 가지고 있음

### 권장사항

1. **상태 관리**: Context/Redux/Zustand 사용
2. **데이터 영속성**: Local Storage 사용
3. **하이브리드 접근**: 상태 관리 라이브러리 + Local Storage 조합

### 최종 답변

Local Storage로 Context/Redux/Zustand를 완전히 대체하는 것은 **권장하지 않음**. 각각의 도구는 고유한 목적과 장단점이 있으며, 적절한 조합 사용이 최선의 방법입니다.

---

## 출처

- [Can We Use Local Storage Instead of Context-Redux-Zustand?](https://www.developerway.com/posts/local-storage-instead-of-context) - Developer Way, Nadia Makarevich
