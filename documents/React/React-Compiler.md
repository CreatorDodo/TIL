# React Compiler

## 개요
React Compiler는 React 19와 함께 도입된 빌드 타임 컴파일러로, 애플리케이션을 자동으로 최적화합니다. 이전에는 "React Forget"이라는 이름으로 알려져 있었습니다.

## 주요 목적
React Compiler의 핵심 목표는 개발자가 수동으로 `useMemo`, `useCallback`, `React.memo`를 사용하지 않아도 자동으로 성능 최적화를 제공하는 것입니다.

## 작동 원리

### 자동 메모이제이션
- 컴파일러가 컴포넌트와 훅을 분석하여 어떤 값과 함수가 메모이제이션되어야 하는지 자동으로 결정합니다
- 불필요한 리렌더링을 방지하기 위해 컴파일 시점에 코드를 최적화합니다
- React의 규칙(Rules of React)을 준수하는 코드에 대해서만 작동합니다

### 컴파일 시점 최적화
```javascript
// 개발자가 작성한 코드
function TodoList({ todos, filter }) {
  const filteredTodos = todos.filter(todo => 
    todo.status === filter
  );
  
  return (
    <ul>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

// React Compiler가 자동으로 최적화
// (개념적 표현 - 실제 출력은 다를 수 있음)
function TodoList({ todos, filter }) {
  const filteredTodos = useMemo(
    () => todos.filter(todo => todo.status === filter),
    [todos, filter]
  );
  
  return useMemo(() => (
    <ul>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  ), [filteredTodos]);
}
```

## 주요 특징

### 1. 자동 최적화
- 수동으로 메모이제이션 훅을 추가할 필요가 없음
- 컴파일러가 자동으로 최적의 최적화 지점을 찾아냄
- 개발자 부담 감소 및 코드 가독성 향상

### 2. 안전성
- React의 규칙을 위반하는 코드는 컴파일러가 건너뜀
- 에러를 발생시키지 않고 안전하게 처리
- 점진적 도입 가능

### 3. 성능 향상
- 불필요한 리렌더링 감소
- 계산 비용이 높은 작업의 자동 메모이제이션
- 전반적인 애플리케이션 성능 개선

## 사용 요구사항

### React 버전
- React 19 이상 권장
- React 18에서도 실험적으로 사용 가능

### 코드 규칙 준수
React Compiler가 제대로 작동하려면 다음 규칙을 준수해야 합니다:

1. **컴포넌트와 훅은 순수 함수여야 함**
   - 동일한 입력에 대해 항상 동일한 출력
   - 렌더링 중 외부 상태 변경 금지

2. **React의 Hooks 규칙 준수**
   - 최상위 레벨에서만 Hook 호출
   - React 함수 내에서만 Hook 호출

3. **불변성 유지**
   - Props와 state를 직접 수정하지 않음
   - 새로운 객체/배열을 생성하여 반환

## 설치 및 설정

### Babel 플러그인 사용
```bash
npm install babel-plugin-react-compiler
```

### babel.config.js 설정
```javascript
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      // 옵션
      runtimeModule: 'react-compiler-runtime'
    }]
  ]
};
```

### Vite 설정 예시
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    })
  ]
});
```

### Next.js 설정 예시
```javascript
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true
  }
};
```

## 장점

### 개발자 경험 향상
- 성능 최적화에 대한 고민 감소
- 더 읽기 쉬운 코드 작성 가능
- 메모이제이션 관련 버그 감소

### 성능
- 자동화된 최적화로 일관된 성능 개선
- 수동 최적화보다 더 효율적일 수 있음
- 최신 최적화 기법 자동 적용

### 유지보수성
- 보일러플레이트 코드 감소
- 의존성 배열 관리 불필요
- 코드 리팩토링이 더 안전해짐

## 제한사항 및 고려사항

### 1. 규칙 준수 필요
- React의 규칙을 위반하는 코드는 최적화되지 않음
- 기존 코드를 규칙에 맞게 수정해야 할 수 있음

### 2. 디버깅
- 컴파일된 코드는 원본과 다를 수 있어 디버깅이 어려울 수 있음
- Source map 지원 필요

### 3. 빌드 시간
- 컴파일 단계가 추가되어 빌드 시간이 약간 증가할 수 있음

### 4. 점진적 도입
- 전체 프로젝트를 한 번에 마이그레이션할 필요는 없음
- 파일 단위로 점진적으로 적용 가능

## 마이그레이션 가이드

### 1. 기존 메모이제이션 제거
```javascript
// 이전 코드
const MemoizedComponent = React.memo(MyComponent);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => handleClick(a, b), [a, b]);

// React Compiler 사용 시 - 간소화 가능
function MyComponent() {
  const value = computeExpensiveValue(a, b);
  const callback = () => handleClick(a, b);
  // 컴파일러가 자동으로 최적화
}
```

### 2. 규칙 위반 코드 수정
```javascript
// ❌ 나쁜 예 - 렌더링 중 외부 상태 변경
function BadComponent() {
  let externalVar = 0;
  externalVar++; // 부수 효과
  return <div>{externalVar}</div>;
}

// ✅ 좋은 예 - 순수 함수
function GoodComponent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

## 실제 사용 예시

### 복잡한 계산 자동 최적화
```javascript
function DataDashboard({ data, filters }) {
  // 컴파일러가 자동으로 메모이제이션
  const processedData = data
    .filter(item => matchesFilters(item, filters))
    .map(item => enrichData(item))
    .sort((a, b) => compareItems(a, b));
  
  const statistics = calculateStatistics(processedData);
  
  return (
    <div>
      <Stats data={statistics} />
      <DataTable data={processedData} />
    </div>
  );
}
```

### 이벤트 핸들러 자동 최적화
```javascript
function SearchComponent({ onSearch, initialQuery }) {
  const [query, setQuery] = useState(initialQuery);
  
  // 컴파일러가 자동으로 메모이제이션
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button type="submit">검색</button>
    </form>
  );
}
```

## 디버깅 및 문제 해결

### 컴파일러 로그 확인
```javascript
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'annotation', // 또는 'all', 'infer'
      logger: {
        logEvent: (event) => {
          console.log(event);
        }
      }
    }]
  ]
};
```

### 특정 컴포넌트 제외
```javascript
// 컴파일러 건너뛰기
'use no memo';

function ManuallyOptimizedComponent() {
  // 이 컴포넌트는 컴파일러가 처리하지 않음
}
```

## 결론

React Compiler는 React 개발의 패러다임을 바꾸는 혁신적인 도구입니다:

- ✅ **자동화**: 수동 최적화 작업 불필요
- ✅ **안전성**: 점진적 도입 가능
- ✅ **성능**: 일관된 성능 개선
- ✅ **생산성**: 개발자가 비즈니스 로직에 집중

React의 규칙을 준수하는 깨끗한 코드를 작성하면, React Compiler가 자동으로 최적화를 처리해줍니다.

## 참고 자료

- [React 공식 문서 - React Compiler](https://react.dev/learn/react-compiler)
- [React Conf 2024 - Introducing React Compiler](https://www.youtube.com/watch?v=kjOacmVsLSE)
- [RFC: React Compiler](https://github.com/reactjs/rfcs/pull/229)

