# Today I Learned 블로그

Next.js + MDX + Contentlayer로 구축된 개인 TIL(Today I Learned) 블로그입니다.

## 특징

- 📝 **MDX 지원**: 마크다운에서 React 컴포넌트 사용 가능
- 🎨 **현대적인 UI**: Tailwind CSS로 구현된 깔끔한 디자인
- 🔍 **카테고리별 분류**: 학습 내용을 카테고리별로 체계적으로 관리
- 📅 **월간 기록**: 월별로 학습 기록을 확인 가능
- 💡 **코드 하이라이팅**: Prism.js를 활용한 문법 강조
- 🔗 **헤딩 앵커**: 자동 생성되는 목차 링크
- 📱 **반응형 디자인**: 모든 디바이스에서 최적화된 경험

## 프로젝트 구조

```
blog/                    # Next.js 블로그 앱
├── src/
│   ├── app/            # App Router 페이지
│   │   ├── page.tsx           # 홈페이지
│   │   ├── posts/             # 포스트 관련 페이지
│   │   ├── categories/        # 카테고리 페이지
│   │   └── monthly/           # 월간 기록 페이지
│   └── components/     # 재사용 가능한 컴포넌트
│       └── mdx-components.tsx # MDX 커스텀 컴포넌트
├── contentlayer.config.ts     # Contentlayer 설정
└── next.config.ts             # Next.js 설정

../documents/           # 마크다운 파일들 (소스)
└── React/
    └── Form.md        # 예시 포스트
```

## 설치 및 실행

### 1. 의존성 설치

```bash
cd blog
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 사용 방법

### 새 포스트 작성

1. `../documents` 폴더에 카테고리별 폴더를 생성
2. 마크다운 파일(`.md`) 작성
3. frontmatter로 메타데이터 추가 (선택사항)

예시:
```markdown
---
title: "React 폼 관리"
description: "React에서 폼을 효과적으로 관리하는 방법들"
date: "2024-01-15"
tags: ["react", "form", "frontend"]
---

# React 폼 관리

여기에 내용을 작성하세요...
```

### 지원되는 frontmatter 필드

- `title`: 포스트 제목 (없으면 파일명에서 자동 추출)
- `description`: 포스트 설명
- `date`: 작성일 (없으면 파일 수정일 사용)
- `tags`: 태그 배열
- `category`: 카테고리 (폴더명에서 자동 추출)

### MDX 기능

- **코드 블록**: 문법 강조 및 복사 버튼
- **헤딩 앵커**: 클릭 가능한 헤딩 링크
- **테이블**: GitHub Flavored Markdown 테이블
- **인용구**: 스타일링된 blockquote
- **링크**: 내부/외부 링크 자동 구분

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **콘텐츠**: MDX + Contentlayer
- **마크다운 처리**: 
  - remark-gfm (GitHub Flavored Markdown)
  - remark-prism (코드 하이라이팅)
  - rehype-slug (헤딩 ID)
  - rehype-autolink-headings (헤딩 앵커)

## 라이선스

MIT License