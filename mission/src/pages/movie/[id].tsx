import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  return {
    props: {
      movie,
    },
  };
};

export default function Movie({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!movie) return "조회 에러";

  const { id, title, subTitle, description, posterImgUrl } = movie;

  // const router = useRouter();
  // const { id } = router.query;

  return (
    <h1>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>

        <div className={style.description}>{description}</div>
      </div>
    </h1>
  );
}
