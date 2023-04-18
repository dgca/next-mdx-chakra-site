import { useRouter } from "next/router";
import { useEffect } from "react";
import { sidebar } from "@/content/docs/sidebar";

export default function Docs() {
  const router = useRouter();

  useEffect(() => {}, []);

  return null;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: `/docs/${sidebar[0]}`,
      permanent: false,
    },
  };
}
