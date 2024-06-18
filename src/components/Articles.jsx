import { getRequest } from "../utils/api";
import { useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
const Articles = ({
  listArticles,
  setlistArticles,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    getRequest("/api/articles")
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
            key={article.article_id}
          />
        );
      })}
    </div>
  );
};
export default Articles;
