import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

import Head from "next/head";

// getServerSideProps 이 함수만 만들어어도 자동 SSR이됨
// export const getServerSideProps = async () => {.   => 이건 SSR
export const getStaticProps = async () => {
  // 컴포넌트 보다 먼저 실행됨

  // const allBooks = await fetchBooks();
  // const recommandBooks = await fetchRandomBooks();

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
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요!"
        />
      </Head>

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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
