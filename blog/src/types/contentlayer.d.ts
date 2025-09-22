declare module "contentlayer/generated" {
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

  export const allPosts: Post[];
}
