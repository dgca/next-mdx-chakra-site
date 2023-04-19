import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import {
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Link,
  Box,
  chakra,
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MDXProvider as BaseMDXProvider } from "@mdx-js/react";
import { ReactNode, ComponentProps } from "react";
import { YouTube } from "@/components/YouTube/YouTube";
// import { YouTube } from "@/components/YouTube/YouTube";

const DEFAULT_TEXT_PROPS = {
  fontSize: "md",
  lineHeight: 1.6,
};

const rendererComponents: ComponentProps<typeof MDXRemote>["components"] = {
  h1: (props) => (
    <Heading {...props} fontSize="2xl" my="8" fontWeight="medium" />
  ),
  h2: (props) => <Heading {...props} fontSize="3xl" my="6" />,
  h3: (props) => <Heading {...props} fontSize="2xl" my="6" />,
  h4: (props) => <Heading {...props} fontSize="xl" my="4" />,
  h5: (props) => <Heading {...props} fontSize="lg" my="4" />,
  p: (props) => <Text {...props} mb="6" {...DEFAULT_TEXT_PROPS} />,
  ul: (props) => (
    <UnorderedList {...props} as="ul" spacing="2" {...DEFAULT_TEXT_PROPS} />
  ),
  ol: (props) => (
    <OrderedList {...props} as="ol" spacing="2" {...DEFAULT_TEXT_PROPS} />
  ),
  li: (props) => <ListItem {...props} as="li" {...DEFAULT_TEXT_PROPS} />,
  a: ({ href, children }) => {
    return (
      <Link
        as={href?.startsWith("/") ? NextLink : "a"}
        href={href}
        target={href?.startsWith("/") ? undefined : "_blank"}
        rel="noreferrer"
        fontWeight="medium"
        textDecoration="underline"
        color="#3344dd"
        _visited={{ color: "#884488" }}
      >
        {children}
      </Link>
    );
  },
  pre: ({ children }) => {
    return (
      <Box borderRadius="lg" my={4} overflow="hidden">
        <chakra.pre whiteSpace="pre-wrap">{children}</chakra.pre>
      </Box>
    );
  },
  hr: () => <Divider my={16} />,
  table: (props) => (
    <Box overflow="auto">
      <Box as="table" {...props} {...DEFAULT_TEXT_PROPS} mb={8} />
    </Box>
  ),
};

function MDXRenderer({ markdown }: { markdown: MDXRemoteProps }) {
  return <MDXRemote {...markdown} lazy components={rendererComponents} />;
}

const providerComponents = {
  Img: (props: any) => (
    <Box my={6}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt="" />
    </Box>
  ),
  YouTube: (props: ComponentProps<typeof YouTube>) => (
    <Box my={8}>
      <YouTube {...props} />
    </Box>
  ),
};

export function MDXProvider({ children }: { children: ReactNode }) {
  return (
    <BaseMDXProvider components={providerComponents}>
      {children}
    </BaseMDXProvider>
  );
}

MDXRenderer.Provider = MDXProvider;

export { MDXRenderer };
