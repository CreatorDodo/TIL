# React Hooks

## useMemo

**목적**: 비용이 많이 드는 계산의 결과를 메모이제이션(캐싱)합니다.

```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**사용 시기**:

- 렌더링 중 수행되는 무거운 계산을 최적화할 때
- 의존성 배열의 값이 변경될 때만 재계산이 필요할 때
- 자식 컴포넌트에 참조 동일성이 유지된 객체/배열을 전달할 때

---

## useContext

**목적**: 컴포넌트 트리 전체에 데이터를 전달하는 방법입니다. Props drilling 없이 깊은 컴포넌트에 데이터를 전달할 수 있습니다.

```typescript
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ChildComponent />
    </ThemeContext.Provider>
  );
}

function ChildComponent() {
  const theme = useContext(ThemeContext); // 'dark'
  return <div>현재 테마: {theme}</div>;
}
```

**사용 시기**:

- 전역 상태 관리 (테마, 언어, 사용자 정보 등)
- 여러 단계를 거쳐 props를 전달하는 것을 피하고 싶을 때

---

## useCallback

**목적**: 함수를 메모이제이션하여 불필요한 재생성을 방지합니다.

```typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**사용 시기**:

- 자식 컴포넌트에 콜백을 전달할 때 (특히 `React.memo`와 함께)
- 의존성 배열에 함수를 넣어야 할 때
- 이벤트 핸들러의 참조 동일성이 중요할 때

---

## useMemo vs useCallback 비교

| 특징   | useMemo                     | useCallback             |
| ------ | --------------------------- | ----------------------- |
| 반환값 | **계산된 값**               | **함수 자체**           |
| 용도   | 비용이 큰 연산 결과 캐싱    | 함수 참조 유지          |
| 문법   | `useMemo(() => fn(), deps)` | `useCallback(fn, deps)` |

> 💡 **참고**: `useCallback(fn, deps)`는 `useMemo(() => fn, deps)`와 동일합니다.

---

## 참고 자료

- [React TypeScript 공식 문서](https://react.dev/learn/typescript)
