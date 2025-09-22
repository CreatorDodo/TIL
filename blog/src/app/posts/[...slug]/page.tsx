import { allPosts } from "@/lib/posts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { mdxComponents } from "@/components/mdx-components";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 네비게이션 */}
      <nav className="mb-8">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 홈으로 돌아가기
        </Link>
      </nav>

      {/* 포스트 헤더 */}
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Link
            href={`/categories/${post.category}`}
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            {post.category}
          </Link>
          <time className="text-gray-500 text-sm">
            {format(
              new Date(post.date || post._raw.sourceFileDir),
              "yyyy년 M월 d일",
              { locale: ko }
            )}
          </time>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {post.description}
          </p>
        )}

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>읽는 시간: {post.readingTime}분</span>
        </div>
      </header>

      {/* 포스트 내용 */}
      <article className="max-w-none">
        <ReactMarkdown components={mdxComponents}>
          {post.body.raw}
        </ReactMarkdown>
      </article>

      {/* 포스트 하단 네비게이션 */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <Link
            href={`/categories/${post.category}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← {post.category} 카테고리의 다른 글들
          </Link>
          <Link
            href="/posts"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            모든 포스트 보기 →
          </Link>
        </div>
      </footer>
    </div>
  );
}
