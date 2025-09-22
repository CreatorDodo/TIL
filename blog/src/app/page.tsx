import { allPosts } from "@/lib/posts";
import { compareDesc, format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(
      new Date(a.date || a._raw.sourceFileDir),
      new Date(b.date || b._raw.sourceFileDir)
    )
  );

  // 카테고리별 포스트 수 계산
  const categoryCount = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Today I Learned</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          오늘 배운 것을 기록하는 공간
        </p>
        <div className="flex justify-center space-x-8 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {posts.length}
            </div>
            <div className="text-gray-500">총 포스트</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(categoryCount).length}
            </div>
            <div className="text-gray-500">카테고리</div>
          </div>
        </div>
      </div>

      {/* 카테고리 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(categoryCount).map(([category, count]) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="font-semibold">{category}</div>
              <div className="text-sm text-gray-500">{count}개 포스트</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 최근 포스트 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">최근 포스트</h2>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <article
              key={post._id}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
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
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  href={post.url}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </h3>
              {post.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-3">
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

        {posts.length > 5 && (
          <div className="text-center mt-8">
            <Link
              href="/posts"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              모든 포스트 보기
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
