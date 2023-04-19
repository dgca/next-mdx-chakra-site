import { sidebar } from "@/content/docs/sidebar";

export default function Docs() {
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
