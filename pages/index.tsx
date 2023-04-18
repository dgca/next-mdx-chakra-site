import { Container, Heading, Link, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container as="main" py={12}>
      <Heading mb={8}>Next.js + MDX + Chakra UI Demo</Heading>
      <Text>
        This is a demo of how to use Next.js, MDX, and Chakra UI to create a
        simple documentation or blogging website. The source code is available
        on{" "}
        <Link
          color="blue.500"
          href="https://github.com/dgca/next-mdx-chakra-site"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>
        .
      </Text>
    </Container>
  );
}
