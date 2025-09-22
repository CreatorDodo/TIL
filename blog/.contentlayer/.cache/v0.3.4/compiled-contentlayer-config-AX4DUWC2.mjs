// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: false,
      description: "\uD3EC\uC2A4\uD2B8 \uC81C\uBAA9 (\uD30C\uC77C\uBA85\uC5D0\uC11C \uC790\uB3D9 \uCD94\uCD9C)"
    },
    date: {
      type: "date",
      required: false,
      description: "\uC791\uC131\uC77C (\uD30C\uC77C \uC218\uC815\uC77C\uC5D0\uC11C \uC790\uB3D9 \uCD94\uCD9C)"
    },
    category: {
      type: "string",
      required: false,
      description: "\uCE74\uD14C\uACE0\uB9AC (\uD3F4\uB354\uBA85\uC5D0\uC11C \uC790\uB3D9 \uCD94\uCD9C)"
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
      description: "\uD0DC\uADF8 \uBAA9\uB85D"
    },
    description: {
      type: "string",
      required: false,
      description: "\uD3EC\uC2A4\uD2B8 \uC124\uBA85"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath
    },
    category: {
      type: "string",
      resolve: (post) => {
        const pathParts = post._raw.flattenedPath.split("/");
        return pathParts.length > 1 ? pathParts[0] : "general";
      }
    },
    title: {
      type: "string",
      resolve: (post) => {
        if (post.title)
          return post.title;
        const pathParts = post._raw.flattenedPath.split("/");
        const fileName = pathParts[pathParts.length - 1];
        return fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/-/g, " ");
      }
    },
    readingTime: {
      type: "number",
      resolve: (post) => {
        const wordsPerMinute = 200;
        const words = post.body.raw.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "../documents",
  // TIL/documents 폴더를 소스로 사용
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [remarkGfm, remarkPrism],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"]
          }
        }
      ]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-AX4DUWC2.mjs.map
