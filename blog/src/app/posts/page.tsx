import { allPosts } from "@/lib/posts";
import { compareDesc, format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

export const metadata = {
  title: "모든 포스트 - Today I Learned",
  description: "모든 학습 기록을 확인해보세요.",
};

export default function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(
      new Date(a.date || a._raw.sourceFileDir),
      new Date(b.date || b._raw.sourceFileDir)
    )
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">모든 포스트</h1>
        <p className="text-gray-600 dark:text-gray-400">
          총 {posts.length}개의 학습 기록이 있습니다.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <Link
                href={`/categories/${post.category}`}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                {post.category}
              </Link>
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
