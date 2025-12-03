# React 렌더링 방식

## 단일 페이지 앱 (SPA - Single Page Application)

단일 페이지 앱(SPA)은 단일 HTML 페이지를 로드하고 사용자가 앱과 상호 작용할 때 페이지를 동적으로 업데이트합니다. SPA는 시작하기는 쉽지만 초기 로드 시간이 느릴 수 있습니다. SPA는 대부분의 빌드 도구에서 기본 아키텍처로 사용됩니다.

### SPA의 특징

- **장점:**

  - 빠른 페이지 전환 (클라이언트 사이드 라우팅)
  - 부드러운 사용자 경험
  - 서버 부하 감소
  - 오프라인 기능 구현 가능

- **단점:**
  - 초기 로드 시간이 길 수 있음
  - SEO 최적화가 어려움
  - 메모리 사용량이 높을 수 있음

### SPA 구현 예시

```jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 스트리밍 서버 측 렌더링 (SSR - Server-Side Rendering)

스트리밍 서버 측 렌더링(SSR)은 서버에서 페이지를 렌더링하고 완전히 렌더링된 페이지를 클라이언트로 전송합니다. SSR은 성능을 향상시킬 수 있지만, 단일 페이지 앱보다 설정 및 유지 관리가 더 복잡할 수 있습니다. 스트리밍 기능이 추가되면 SSR은 설정 및 유지 관리가 매우 복잡해질 수 있습니다. Vite의 SSR 가이드를 참조하세요.

### SSR의 특징

- **장점:**

  - 빠른 초기 로드 시간
  - SEO 최적화
  - 소셜 미디어 공유 최적화
  - 검색 엔진 크롤링 지원

- **단점:**
  - 서버 부하 증가
  - 설정 및 유지 관리 복잡성
  - 하이드레이션 과정 필요

### SSR 구현 예시 (Next.js)

```jsx
// pages/index.js
import React from "react";

export default function Home({ data }) {
  return (
    <div>
      <h1>Server-Side Rendered Page</h1>
      <p>Data: {data}</p>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetchData();
  return {
    props: { data },
  };
}
```

## 정적 사이트 생성 (SSG - Static Site Generation)

정적 사이트 생성(SSG)은 빌드 시 앱의 정적 HTML 파일을 생성합니다. SSG는 성능을 향상시킬 수 있지만, 서버 측 렌더링보다 설정 및 유지 관리가 더 복잡할 수 있습니다. Vite의 SSG 가이드를 참조하세요.

### SSG의 특징

- **장점:**

  - 매우 빠른 로드 속도
  - CDN 캐싱 최적화
  - 서버 비용 절약
  - 보안성 향상

- **단점:**
  - 동적 콘텐츠 처리 제한
  - 빌드 시간 증가
  - 실시간 업데이트 어려움

### SSG 구현 예시 (Next.js)

```jsx
// pages/blog/[slug].js
import React from "react";

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}
```

## React Server Components (RSC)

React Server Components(RSC)를 사용하면 빌드 타임, 서버 전용, 인터랙티브 컴포넌트를 단일 React 트리에 혼합할 수 있습니다. RSC는 성능을 향상시킬 수 있지만, 현재 설정 및 유지 관리에 대한 전문 지식이 필요합니다. Parcel의 RSC 예시를 참조하세요.

### RSC의 특징

- **장점:**

  - 서버와 클라이언트 컴포넌트 혼합 가능
  - 번들 크기 감소
  - 서버 리소스 활용
  - 점진적 향상

- **단점:**
  - 복잡한 설정
  - 제한된 브라우저 지원
  - 학습 곡선이 가파름

### RSC 구현 예시

```jsx
// Server Component
async function ServerComponent() {
  const data = await fetch("https://api.example.com/data");
  return <div>Server data: {data}</div>;
}

// Client Component
("use client");
import { useState } from "react";

function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// App Component
function App() {
  return (
    <div>
      <ServerComponent />
      <ClientComponent />
    </div>
  );
}
```

## 렌더링 방식 비교

| 방식 | 초기 로드 | SEO  | 복잡성    | 성능      | 사용 사례               |
| ---- | --------- | ---- | --------- | --------- | ----------------------- |
| SPA  | 느림      | 나쁨 | 낮음      | 보통      | 대시보드, 관리자 페이지 |
| SSR  | 빠름      | 좋음 | 높음      | 좋음      | 블로그, 뉴스 사이트     |
| SSG  | 매우 빠름 | 좋음 | 중간      | 매우 좋음 | 문서, 마케팅 사이트     |
| RSC  | 빠름      | 좋음 | 매우 높음 | 좋음      | 복잡한 웹 애플리케이션  |

## 선택 가이드

1. **SPA**: 빠른 개발이 필요하고 SEO가 중요하지 않은 경우
2. **SSR**: SEO가 중요하고 실시간 데이터가 필요한 경우
3. **SSG**: 정적 콘텐츠가 많고 최고 성능이 필요한 경우
4. **RSC**: 복잡한 애플리케이션이고 최신 기능을 활용하고 싶은 경우
