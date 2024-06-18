import ArticleCard from "./ArticleCard";
import { getRequest } from "../utils/api";
import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import { Link } from "react-router-dom";
const Home = ({ listArticles, setlistArticles }) => {
  // const [topArticles, setTopArticles] = useState([]);
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
    });
  }, []);

  return (
    <div className="ml-10">
      <p className="font-mono text-[30px]">{`${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</p>
      <p className="font-mono mb-5">Today's top articles</p>
      <div className="grid-flow-col  space-y-8 ml-20">
        {listArticles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
        <Link to="/articles">
          <NavButton buttonText={"More Articles"} />
        </Link>
      </div>
      {/* <Link to="/articles"> */}
      {/* </Link> */}
    </div>
  );
};
export default Home;
