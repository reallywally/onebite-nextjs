import { ReactNode } from "react";
import SearchableLayout from "./components/searchable-layout";
import style from "./index.module.css";
import MovieItem from "./components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-moviess";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";

export const getStaticProps = async () => {
  const [allMovies, recoMovices] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovices,
    },
  };
};

export default function Home({
  allMovies,
  recoMovices,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.movielist}>
          {recoMovices.map((moive) => (
            <MovieItem key={moive.id} {...moive} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화화</h3>
        <div className={style.movielist}>
          {allMovies.map((moive) => (
            <MovieItem key={moive.id} {...moive} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
