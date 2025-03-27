import { useRouter } from "next/router";

export default function Test() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;

  return <h1> {id} test</h1>;
}
