import ArticleCard from "./ArticleCard";
import NavButton from "./NavButton";
import Loading from "./Loading";
import ArticleSidebar from "./ArticlesSideBar";
import { getRequest } from "../utils/api";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
const Home = ({ listArticles, setlistArticles, isLoading, setIsLoading }) => {
  const { userDetails } = useContext(UserContext);

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
    <div className="flex">
      <ArticleSidebar />
      <div className="ml-10">
        <div className="flex items-center mb-10">
          <img
            src={userDetails.avatar_url}
            className="rounded-full border-2 border-red-800 h-[70px] mr-5"
          ></img>
          <h2 className="font-mono text-[30px]">
            Welcome back{" "}
            <span className="text-red-800 ">{userDetails.username}!</span>
          </h2>
        </div>
        <h3 className="font-mono text-[30px]">{`${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`}</h3>
        <p className="font-mono mb-5">Today's top articles</p>
        <div className="grid-flow-col  space-y-8">
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
            <div className="m-auto">
              <Link to="/articles">
                <NavButton buttonText={"More Articles"} />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Home;
