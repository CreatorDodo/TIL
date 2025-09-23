import { allPosts } from "@/lib/posts";
import { compareDesc, format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = [...new Set(allPosts.map((post) => post.category))];
  return categories.map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryPosts = allPosts.filter(
    (post) => post.category === decodedCategory
  );

  if (categoryPosts.length === 0) {
    return {};
  }

  return {
    title: `${decodedCategory} - Today I Learned`,
    description: `${decodedCategory} 카테고리의 학습 기록들입니다. 총 ${categoryPosts.length}개의 포스트가 있습니다.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const categoryPosts = allPosts
    .filter((post) => post.category === decodedCategory)
    .sort((a, b) =>
      compareDesc(
        new Date(a.date || a._raw.sourceFileDir),
        new Date(b.date || b._raw.sourceFileDir)
      )
    );

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 네비게이션 */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            홈
          </Link>
          <span className="text-gray-500">›</span>
          <Link
            href="/categories"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            카테고리
          </Link>
          <span className="text-gray-500">›</span>
          <span className="text-gray-500">{decodedCategory}</span>
        </div>
      </nav>

      {/* 카테고리 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{decodedCategory}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          이 카테고리에 {categoryPosts.length}개의 학습 기록이 있습니다.
        </p>
      </div>

      {/* 포스트 목록 */}
      <div className="space-y-6">
        {categoryPosts.map((post) => (
          <article
            key={post._id}
            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <time className="text-sm text-gray-500">
                {format(
                  new Date(post.date || post._raw.sourceFileDir),
                  "yyyy년 M월 d일",
                  { locale: ko }
                )}
              </time>
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              <Link
                href={post.url}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {post.title}
              </Link>
            </h2>

            {post.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.description}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>읽는 시간: {post.readingTime}분</span>
              <Link
                href={post.url}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                자세히 보기 →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
