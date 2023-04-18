import { readdirSync } from "fs";
import path from "path";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { parseFileByPath, renderMarkdown } from "@/lib/md/server";
import { MDXRenderer } from "@/lib/md/client";
import { ComponentProps } from "react";
import { sidebar } from "@/content/docs/sidebar";
import { useRouter } from "next/router";

type Props = {
  title: string;
  markdown: ComponentProps<typeof MDXRenderer>["markdown"];
  sidebarContent: Array<{ route: string; label: string }>;
};

export default function DocsPage({ title, markdown, sidebarContent }: Props) {
  const router = useRouter();
  return (
    <Flex as="main" flexGrow={1}>
      <VStack
        bg="white"
        px={8}
        py={12}
        alignItems="stretch"
        borderRight="1px solid rgba(0, 0, 0, 0.1)"
      >
        {sidebarContent.map((item) => (
          <Text
            as={Link}
            href={`/docs/${item.route}`}
            key={item.route}
            fontWeight={
              router.asPath === `/docs/${item.route}` ? "bold" : "normal"
            }
            _hover={{
              textDecoration: "underline",
            }}
          >
            {item.label}
          </Text>
        ))}
      </VStack>
      <Container flexGrow={1} py={12}>
        <Heading mb={8}>{title}</Heading>
        <MDXRenderer markdown={markdown} />
      </Container>
    </Flex>
  );
}

const CONTENT_PATH = path.join(process.cwd(), "content", "docs");

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || typeof params.slug !== "string") {
    throw new Error("Slug must be a string");
  }

  const { frontMatter, content } = parseFileByPath(
    path.join(CONTENT_PATH, `${params.slug}.mdx`)
  );

  const markdown = await renderMarkdown(content);

  const contentMap = readdirSync(CONTENT_PATH)
    .filter((item) => item.endsWith(".mdx"))
    .map((filename) => {
      const fullPath = path.join(CONTENT_PATH, filename);
      const frontMatter = parseFileByPath(fullPath).frontMatter;
      const label = frontMatter.label ?? frontMatter.title;
      return {
        route: filename.replace(/\.mdx?$/, ""),
        label: label as string,
      };
    })
    .reduce<Record<string, Record<string, string>>>((acc, current) => {
      acc[current.route] = current;
      return acc;
    }, {});

  const sidebarContent = sidebar.map((item) => {
    const currentItem = contentMap[item];
    return {
      route: currentItem.route,
      label: currentItem.label,
    };
  });

  return {
    props: {
      title: frontMatter.title as string,
      markdown,
      sidebarContent,
    },
  };
};

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
