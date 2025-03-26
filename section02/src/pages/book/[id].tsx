import { useRouter } from "next/router";

// [...id].tsx catch all segment
// [[...id]].tsx optional catch all segment
export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>책 상세 {id}</h1>;
}
