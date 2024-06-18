import ArticleCard from "./ArticleCard";
import NavButton from "./NavButton";
import Loading from "./Loading";
import { getRequest } from "../utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = ({
  listArticles,
  setlistArticles,
  isLoading,
  setIsLoading,
  setArticle,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();

  useEffect(() => {
    getRequest("/api/articles?sort_by=votes&limit=3").then(({ articles }) => {
      setlistArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="ml-10">
      <p className="font-mono text-[30px]">{`${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</p>
      <p className="font-mono mb-5">Today's top articles</p>
      <div className="grid-flow-col  space-y-8 ml-20">
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
        {!isLoading ? (
          <Link to="/articles">
            <NavButton buttonText={"More Articles"} />
          </Link>
        ) : null}
      </div>
      {/* <Link to="/articles"> */}
      {/* </Link> */}
    </div>
  );
};
export default Home;
