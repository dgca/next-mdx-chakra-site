import { readdirSync } from "fs";
import path from "path";
import NextLink from "next/link";
import { GetStaticProps } from "next";
import {
  Container,
  Heading,
  Text,
  Box,
  Stack,
  StackDivider,
  Link,
} from "@chakra-ui/react";
import { format, parse } from "date-fns";
import { parseFileByPath } from "@/lib/md/server";

type BlogItem = {
  title: string;
  description: string;
  slug: string;
  date: string;
  timestamp: number;
  id: number;
};

type Props = {
  blogs: BlogItem[];
};

export default function Blog({ blogs }: Props) {
  return (
    <Container as="main" py={12}>
      <Heading mb={8}>Blog</Heading>
      <Stack divider={<StackDivider />} spacing="4">
        {blogs.map((post) => (
          <Stack key={post.id} spacing="1">
            <Box>
              <Link
                fontWeight="medium"
                as={NextLink}
                href={`/blog/${post.slug}`}
                color="blue.500"
                fontSize="1.2rem"
              >
                {post.title}
              </Link>
              <Text color="subtle">Published {post.date}</Text>
            </Box>
            <Text
              color="muted"
              sx={{
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": "2",
                overflow: "hidden",
                display: "-webkit-box",
              }}
            >
              {post.description}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

const CONTENT_PATH = path.join(process.cwd(), "content", "blog");

// This function gets called at build time and it will create a list of blog
// posts to be displayed on the blog page.
export const getStaticProps: GetStaticProps = async () => {
  const blogs = readdirSync(CONTENT_PATH)
    // Only include md(x) files
    .filter((item) => item.endsWith(".mdx"))
    // For each item, parse the frontmatter and date to create the blog list
    .map((item, i) => {
      const builtPath = path.join(CONTENT_PATH, item);
      const { frontMatter } = parseFileByPath(builtPath);

      const date = item.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;

      if (!date) {
        throw new Error(`Invalid date format for blog article: ${item}`);
      }

      return {
        title: frontMatter.title as string,
        description: frontMatter.description as string,
        slug: item.replace(/\.mdx?$/, ""),
        date: format(parse(date, "yyyy-MM-dd", new Date()), "MMMM dd, yyyy"),
        timestamp: parse(date, "yyyy-MM-dd", new Date()).valueOf(),
        id: i,
      };
    })
    .sort((a, b) => {
      return a.timestamp > b.timestamp ? -1 : 1;
    });

  return {
    props: {
      blogs,
    },
  };
};
