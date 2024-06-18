import { getRequest } from "../utils/api";
import { useEffect } from "react";
import ArticleCard from "./ArticleCard";
const Articles = ({ listArticles, setlistArticles }) => {
  useEffect(() => {
    getRequest("/api/articles")
      .then(({ articles }) => {
        setlistArticles(articles);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" grid-flow-col  space-y-8 ml-20">
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
