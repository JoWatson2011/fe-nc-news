import { getRequest } from "../utils/api";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ArticlesSideBar from "./ArticlesSideBar";
const Articles = ({
  listArticles,
  setlistArticles,
  isLoading,
  setIsLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTopic, setCurrentTopic] = useState(searchParams.get("topic"));
  const [currentTopicDescription, setCurrentTopicDescription] = useState("");
  const [topics, setTopics] = useState([]);

  const getRequestURL = currentTopic
    ? `/api/articles?topic=${currentTopic}`
    : "/api/articles";
  console.log(currentTopic);

  useEffect(() => {
    getRequest(getRequestURL)
      .then(({ articles }) => {
        setlistArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getRequest("/api/topics").then(({ topics }) => {
      setTopics(topics);

      const currentTopicApi = topics.filter((apiTopic) => {
        return apiTopic.slug === currentTopic;
      });
      setCurrentTopicDescription(currentTopicApi[0].description);
    });
  }, [currentTopic]);
  return (
    <div>
      <h2 className="ml-10 mt-10 font-mono text-[30px]">
        <Link to="/articles" reloadDocument="true">
          Articles
        </Link>
        <span className=" text-red-700">
          {" "}
          {currentTopic ? `/ ${currentTopic}` : ""}{" "}
        </span>
      </h2>
      {currentTopic ? (
        <h3 className="ml-10 mb-10 font-mono">{currentTopicDescription}</h3>
      ) : null}
      <div className="flex">
        <ArticlesSideBar topics={topics} currentTopic ={currentTopic}/>
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
      </div>
    </div>
  );
};
export default Articles;
