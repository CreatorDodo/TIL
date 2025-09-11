# React 폼 관리

## 비제어 컴포넌트 (Uncontrolled Components)

useRef를 사용하여 DOM 요소에 직접 접근하는 방식. 입력값을 React State로 관리하지 않고 제출 시점에 필요한 값을 DOM에서 읽는다.

### 주의사항

- 기본값은 `defaultValue` 속성으로 지정
- `value` 속성을 사용하면 값이 변경되지 않음

### 언제 쓰나

- **단순 폼**: 즉각적인 유효성 검사/상태 동기화가 중요하지 않을 때
- **파일 입력**: 파일 인풋은 제어가 불가하여 보통 `ref`로 접근
- **성능 고려**: 매우 많은 입력이 있을 때 렌더링을 최소화하고 싶을 때

### 예제

```jsx
import { useRef } from "react";

function UncontrolledForm() {
  const nameRef = useRef(null);
  const ageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current?.value ?? "";
    const age = Number(ageRef.current?.value ?? 0);
    alert(`${name} / ${age}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="홍길동" placeholder="이름" />
      <input ref={ageRef} type="number" defaultValue={20} placeholder="나이" />
      <button type="submit">저장</button>
    </form>
  );
}
```

### 파일 입력 예제

```jsx
import { useRef } from "react";

function FileInput() {
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return alert("파일을 선택하세요");
    console.log(file.name, file.size);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={fileRef} type="file" accept="image/*" />
      <button type="submit">업로드</button>
    </form>
  );
}
```

## State 관리

### 스프레드 구문 (얕은 복제)

```javascript
...value
```

얕은 복제는 객체/배열의 1단계 프로퍼티만 복제한다. 중첩 객체는 참조가 유지된다.

```jsx
// 객체 업데이트
const [user, setUser] = useState({ name: "", age: 0 });
setUser((prev) => ({ ...prev, age: prev.age + 1 }));

// 배열 업데이트
const [todos, setTodos] = useState([{ id: 1, text: "a", done: false }]);
setTodos((prev) => prev.map((t) => (t.id === 1 ? { ...t, done: !t.done } : t)));
```

### 중첩된 State 관리

- 예시: `address { city, do }`와 같은 중첩 구조
- address 업데이트 시 추가 복제 필요
- **권장**: State를 평평하게 구성 (State 정규화)

```jsx
// 중첩 상태를 전개할 때는 단계별로 복제
const [profile, setProfile] = useState({
  name: "",
  address: { city: "", do: "" },
});

setProfile((prev) => ({
  ...prev,
  address: { ...prev.address, city: "서울" },
}));
```

#### 정규화(평평하게 만들기) 예시

```jsx
// before
const [profile, setProfile] = useState({
  name: "",
  address: { city: "", do: "" },
});

// after: 평평한 구조 → 부분 업데이트가 단순해짐
const [name, setName] = useState("");
const [city, setCity] = useState("");
const [do_, setDo] = useState("");
```

### Immer 라이브러리

불가피하게 중첩된 State를 사용해야 할 때 권장되는 라이브러리. 불변성을 자동으로 유지하며, 직관적인 "변경 코드"를 작성할 수 있다.

```bash
npm i immer
```

```jsx
import { useState } from "react";
import { produce } from "immer";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    address: { city: "", do: "" },
  });

  const updateCity = () => {
    setProfile((prev) =>
      produce(prev, (draft) => {
        draft.address.city = "서울";
      })
    );
  };

  return (
    <div>
      <div>{profile.address.city}</div>
      <button onClick={updateCity}>도시 변경</button>
    </div>
  );
}
```

배열 예제:

```jsx
const [todos, setTodos] = useState([
  { id: 1, text: "a", done: false },
  { id: 2, text: "b", done: true },
]);

const toggle = (id) => {
  setTodos((prev) =>
    produce(prev, (draft) => {
      const item = draft.find((t) => t.id === id);
      if (item) item.done = !item.done;
    })
  );
};
```

### 제어 컴포넌트 (Controlled Components)

입력값을 React State로 완전히 관리하는 방식. `value`와 `onChange`를 통해 UI ↔ 상태를 동기화한다.

#### 장단점

- 장점: 즉각 유효성 검증, 버튼 비활성 같은 UI 제어, 예측 가능한 상태
- 단점: 입력 수가 매우 많으면 렌더링 비용 증가 가능

#### 예제

```jsx
import { useState } from "react";

function ControlledForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const isValid = name.trim().length >= 2 && Number(age) > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    console.log({ name, age: Number(age) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="number"
        placeholder="나이"
      />
      <button type="submit" disabled={!isValid}>
        저장
      </button>
    </form>
  );
}
```

### 팁

- 파일 입력은 제어 불가 → `ref` 사용
- 큰 폼은 하이브리드: 입력은 비제어 + 제출 시 `FormData`로 한 번에 수집
- 성능이 문제면 `onChange`를 디바운스하거나 `React Hook Form` 같은 라이브러리 고려
