import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: false,
      description: "포스트 제목 (파일명에서 자동 추출)",
    },
    date: {
      type: "date",
      required: false,
      description: "작성일 (파일 수정일에서 자동 추출)",
    },
    category: {
      type: "string",
      required: false,
      description: "카테고리 (폴더명에서 자동 추출)",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
      description: "태그 목록",
    },
    description: {
      type: "string",
      required: false,
      description: "포스트 설명",
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath,
    },
    category: {
      type: "string",
      resolve: (post) => {
        const pathParts = post._raw.flattenedPath.split("/");
        return pathParts.length > 1 ? pathParts[0] : "general";
      },
    },
    title: {
      type: "string",
      resolve: (post) => {
        // frontmatter에 title이 있으면 사용, 없으면 파일명에서 추출
        if (post.title) return post.title;
        const pathParts = post._raw.flattenedPath.split("/");
        const fileName = pathParts[pathParts.length - 1];
        return fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/-/g, " ");
      },
    },
    readingTime: {
      type: "number",
      resolve: (post) => {
        const wordsPerMinute = 200;
        const words = post.body.raw.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
      },
    },
  },
}));

export default makeSource({
  contentDirPath: `${process.cwd()}/../documents`, // TIL/documents 폴더를 소스로 사용
  documentTypes: [Post],
  disableImportAliasWarning: true,
});
