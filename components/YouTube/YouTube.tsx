import { AspectRatio, Box } from "@chakra-ui/react";

export function YouTube({ src }: { src: string }) {
  const { id } = parse(src);
  return (
    <AspectRatio ratio={16 / 9} position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        as="iframe"
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
        frameBorder="0"
      />
    </AspectRatio>
  );
}

function parse(url: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
  const match = url.match(regex);
  return match ? { id: match[1] } : { id: null };
}
