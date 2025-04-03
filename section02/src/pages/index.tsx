import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// getServerSideProps 이 함수만 만들어어도 자동 SSR이됨
// export const getServerSideProps = async () => {.   => 이건 SSR
export const getStaticProps = async () => {
  // 컴포넌트 보다 먼저 실행됨

  // const allBooks = await fetchBooks();
  // const recommandBooks = await fetchRandomBooks();
  console.log("인덱스 진짜 한번만?");

  // 병렬 처리
  const [allBooks, recommandBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommandBooks,
    },
    // revalidate: 3, // 재생성 주기 초
  };
};

export default function Home({
  allBooks,
  recommandBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommandBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
