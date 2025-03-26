import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const { q } = router.query;

  return <h1>검색! {q}</h1>;
}
