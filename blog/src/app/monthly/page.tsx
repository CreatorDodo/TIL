import { allPosts, Post } from "@/lib/posts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";

export const metadata = {
  title: "월간 기록 - Today I Learned",
  description: "월별로 정리된 학습 기록을 확인해보세요.",
};

export default function MonthlyPage() {
  // 월별로 포스트 그룹화
  const monthlyPosts = allPosts.reduce((acc, post) => {
    const date = new Date(post.date || post._raw.sourceFileDir);
    const monthKey = format(date, "yyyy-MM");
    const monthLabel = format(date, "yyyy년 M월", { locale: ko });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        label: monthLabel,
        posts: [],
        count: 0,
      };
    }

    acc[monthKey].posts.push(post);
    acc[monthKey].count += 1;

    return acc;
  }, {} as Record<string, { label: string; posts: Post[]; count: number }>);

  // 월별 데이터를 최신순으로 정렬
  const sortedMonths = Object.entries(monthlyPosts).sort(([a], [b]) =>
    b.localeCompare(a)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">월간 기록</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {sortedMonths.length}개월에 걸쳐 {allPosts.length}개의 학습 기록을
          작성했습니다.
        </p>
      </div>

      <div className="space-y-8">
        {sortedMonths.map(([monthKey, data]) => (
          <section key={monthKey} className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{data.label}</h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {data.count}개 포스트
              </span>
            </div>

            <div className="grid gap-4">
              {data.posts
                .sort((a, b) => {
                  const dateA = new Date(a.date || a._raw.sourceFileDir);
                  const dateB = new Date(b.date || b._raw.sourceFileDir);
                  return dateB.getTime() - dateA.getTime();
                })
                .map((post) => (
                  <article
                    key={post._id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Link
                        href={`/categories/${post.category}`}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        {post.category}
                      </Link>
                      <time className="text-xs text-gray-500">
                        {format(
                          new Date(post.date || post._raw.sourceFileDir),
                          "M월 d일",
                          { locale: ko }
                        )}
                      </time>
                    </div>

                    <h3 className="font-semibold mb-2">
                      <Link
                        href={post.url}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {post.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
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
          </section>
        ))}
      </div>
    </div>
  );
}
