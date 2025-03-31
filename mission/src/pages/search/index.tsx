import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./index.module.css";
import SearchableLayout from "../components/searchable-layout";
import movies from "@/mock/dummy.json";
import MovieItem from "../components/movie-item";
import { MovieData } from "@/types";

export default function Search() {
  const router = useRouter();
  const q = router.query.q as string;
  console.log("q", q);
  const [filterItems, setFilterIems] = useState<MovieData[]>([]);

  useEffect(() => {
    if (q === "") {
      setFilterIems(movies);
    } else {
      const list = movies.filter((movie) => movie.title.includes(q));
      console.log("list", list);
      setFilterIems(list);
    }
  }, []);

  return (
    <div className={style.container}>
      {filterItems.map((movie) => (
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
