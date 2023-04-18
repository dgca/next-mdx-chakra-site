import { Box, Button, ButtonGroup, Container, HStack } from "@chakra-ui/react";
import Link from "next/link";

export function Nav() {
  return (
    <Box as="section">
      <Box
        as="nav"
        bg="bg-accent"
        color="on-accent"
        borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      >
        <Container py={{ base: "3", lg: "4" }}>
          <HStack spacing="4">
            <ButtonGroup variant="ghost-on-accent" spacing="1">
              <Button as={Link} href="/">
                Home
              </Button>
              <Button as={Link} href="/blog">
                Blog
              </Button>
              <Button as={Link} href="/docs">
                Docs
              </Button>
            </ButtonGroup>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
