import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  _id: string;
  _raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
    flattenedPath: string;
  };
  type: "Post";
  title: string;
  date?: string;
  category: string;
  tags?: string[];
  description?: string;
  url: string;
  slug: string;
  readingTime: number;
  body: {
    raw: string;
    code: string;
  };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function getAllPosts(): Post[] {
  const documentsPath = path.join(process.cwd(), "..", "documents");

  if (!fs.existsSync(documentsPath)) {
    return [];
  }

  const posts: Post[] = [];

  function readDirectory(dir: string, category = ""): void {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        readDirectory(itemPath, item);
      } else if (item.endsWith(".md")) {
        const content = fs.readFileSync(itemPath, "utf-8");
        const { data, content: bodyContent } = matter(content);

        const relativePath = path.relative(documentsPath, itemPath);
        const slug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");
        const fileName = path.basename(item, ".md");

        posts.push({
          _id: slug,
          _raw: {
            sourceFilePath: relativePath,
            sourceFileName: item,
            sourceFileDir: path.dirname(relativePath),
            contentType: "markdown",
            flattenedPath: slug,
          },
          type: "Post",
          title: data.title || fileName.replace(/-/g, " "),
          date: data.date || fs.statSync(itemPath).mtime.toISOString(),
          category: category || "general",
          tags: data.tags || [],
          description: data.description || "",
          url: `/posts/${slug}`,
          slug,
          readingTime: calculateReadingTime(bodyContent),
          body: {
            raw: bodyContent,
            code: bodyContent, // 임시로 같은 값 사용
          },
        });
      }
    }
  }

  try {
    readDirectory(documentsPath);
  } catch (error) {
    console.error("Error reading posts:", error);
  }

  return posts;
}

export const allPosts = getAllPosts();
