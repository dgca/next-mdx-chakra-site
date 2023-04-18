import { readFileSync } from "fs";
import * as matter from "gray-matter";

// Parses a markdown file by path and returns the frontmatter and content.
export function parseFileByPath(path: string) {
  const { data, content } = matter.default(readFileSync(path));
  return {
    frontMatter: data,
    content,
  };
}
