import { getRequest } from "../utils/api";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
const Articles = ({
  listArticles,
  setlistArticles,
  isLoading,
  setIsLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  const getRequestURL = topic
  ? `/api/articles?topic=${topic}`
  : "/api/articles";
  console.log(getRequestURL);

  useEffect(() => {
    getRequest(getRequestURL)
      .then(({ articles }) => {
        setlistArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" grid-flow-col  space-y-8 ml-20">
      {isLoading ? <Loading /> : null}
      {listArticles.map((article) => {
        return (
          <ArticleCard
            article={article}
            setArticle={setlistArticles}
            key={article.article_id}
          />
        );
      })}
    </div>
  );
};
export default Articles;
