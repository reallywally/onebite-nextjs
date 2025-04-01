import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "../components/movie-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import SearchableLayout from "../components/searchable-layout";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;

  const movies = await fetchMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Search({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        // eslint-disable-next-line react/jsx-key
        <div className={style.item}>
          <MovieItem key={movie.id} {...movie} />
        </div>
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
