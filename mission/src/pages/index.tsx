import { ReactNode } from "react";
import SearchableLayout from "./components/searchable-layout";
import movies from "@/mock/dummy.json";
import style from "./index.module.css";
import MovieItem from "./components/movie-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.movielist}>
          {movies.slice(0, 3).map((moive) => (
            <MovieItem key={moive.id} {...moive} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화화</h3>
        <div className={style.movielist}>
          {movies.slice(0, 5).map((moive) => (
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
