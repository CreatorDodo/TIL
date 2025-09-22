import { allPosts, Post } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "카테고리 - Today I Learned",
  description: "카테고리별로 학습 기록을 확인해보세요.",
};

type CategoryData = Record<
  string,
  {
    count: number;
    posts: Post[];
    latestPost: Post | null;
  }
>;

export default function CategoriesPage() {
  // 카테고리별 포스트 수 계산 및 최신 포스트 정보
  const categoryData = (allPosts as Post[]).reduce(
    (acc: CategoryData, post: Post) => {
      const category = post.category;
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          posts: [],
          latestPost: null,
        };
      }
      acc[category].count += 1;
      acc[category].posts.push(post);

      // 최신 포스트 업데이트
      const postDate = new Date(post.date || post._raw.sourceFileDir);
      const latestDate = acc[category].latestPost
        ? new Date(
            acc[category].latestPost.date ||
              acc[category].latestPost._raw.sourceFileDir
          )
        : new Date(0);

      if (postDate > latestDate) {
        acc[category].latestPost = post;
      }

      return acc;
    },
    {} as CategoryData
  );

  const categories = Object.entries(categoryData).sort(
    ([, a], [, b]) => b.count - a.count
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">카테고리</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {categories.length}개의 카테고리에서 {allPosts.length}개의 학습 기록을
          관리하고 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(([category, data]) => (
          <div
            key={category}
            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{category}</h2>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {data.count}개
              </span>
            </div>

            {data.latestPost && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">최근 포스트:</p>
                <Link
                  href={data.latestPost.url}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {data.latestPost.title}
                </Link>
              </div>
            )}

            <Link
              href={`/categories/${category}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              카테고리 보기 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
