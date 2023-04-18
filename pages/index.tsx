import { Container, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Container>
        <Heading mb={8}>Next.js + MDX + Chakra UI Demo</Heading>
        <Text>
          This is a demo of how to use Next.js, MDX, and Chakra UI to create a
          simple documentation or blogging website. The source code is available
          on <a href="#">Github</a>.
        </Text>
      </Container>
    </main>
  );
}
