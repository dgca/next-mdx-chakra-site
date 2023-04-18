import { readdirSync } from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container, Heading, Text } from "@chakra-ui/react";
import { parseFileByPath, renderMarkdown } from "@/lib/md/server";
import { MDXRenderer } from "@/lib/md/client";
import { ComponentProps } from "react";

type Props = {
  author: string;
  title: string;
  markdown: ComponentProps<typeof MDXRenderer>["markdown"];
};

export default function BlogPost({ author, title, markdown }: Props) {
  return (
    <Container as="main" py={12}>
      <Heading mb={2}>{title}</Heading>
      <Text color="muted" mb={6} fontStyle="italic">
        By {author}
      </Text>
      <MDXRenderer markdown={markdown} />
    </Container>
  );
}

const CONTENT_PATH = path.join(process.cwd(), "content", "blog");

// This function gets called at build time and it will create a page for each
// blog post in the content/blog directory.
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || typeof params.slug !== "string") {
    throw new Error("Slug must be a string");
  }

  const { frontMatter, content } = parseFileByPath(
    path.join(CONTENT_PATH, `${params.slug}.mdx`)
  );

  const markdown = await renderMarkdown(content);

  return {
    props: {
      title: frontMatter.title as string,
      description: frontMatter.description as string,
      author: frontMatter.author as string,
      markdown,
    },
  };
};

// This function gets called at build time and it will create a page for each
// blog post in the content/blog directory.
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const paths = readdirSync(CONTENT_PATH)
    .filter((item) => item.endsWith(".mdx"))
    .map((item) => {
      const slug = item.replace(/\.mdx?$/, "");
      return {
        params: {
          slug,
        },
      };
    });

  return { paths, fallback: false };
};
