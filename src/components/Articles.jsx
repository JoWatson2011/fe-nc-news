import { getRequest } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";
import ArticlesSideBar from "./ArticlesSideBar";
import ErrorComponent from "./ErrorComponent";
import ArticlesListOptions from "./ArticlesListOptions";
import { TopicsContext } from "../contexts/TopicsContext";

const Articles = ({
  listArticles,
  setlistArticles,
  isLoading,
  setIsLoading,
}) => {
  const { topics, awaitingTopics } = useContext(TopicsContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTopic, setCurrentTopic] = useState(searchParams.get("topic"));
  const [currentTopicDescription, setCurrentTopicDescription] = useState("");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by"));
  const [order, setOrder] = useState(searchParams.get("order"));
  const [error, setError] = useState(null);
  useEffect(() => {
    let getRequestURL = "/api/articles?";
    getRequestURL += currentTopic ? `topic=${currentTopic}` : "";

    getRequestURL += currentTopic && sortBy ? "&" : "";

    getRequestURL += sortBy ? `sort_by=${sortBy}` : "";
    getRequestURL += order && sortBy ? `&order=${order}` : "";

    getRequest(getRequestURL)
      .then(({ articles }) => {
        setlistArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  }, [sortBy, order]);

  useEffect(() => {
    if (!currentTopic & !awaitingTopics) {
      const currentTopicApi = topics.filter((apiTopic) => {
        return apiTopic.slug === currentTopic;
      });
      setCurrentTopicDescription(currentTopicApi[0].description);
    }
  }, [currentTopic]);

  return (
    <div className="flex">
      <ArticlesSideBar currentTopic={currentTopic} />
      <div>
        <div className="m-10">
          <div>
            <h2 className=" font-mono text-[30px] ml-6">
              <Link to="/articles" reloadDocument="true">
                Articles
              </Link>
              {error ? null : (
                <span className=" text-red-700">
                  {" "}
                  {currentTopic ? `/ ${currentTopic}` : ""}{" "}
                </span>
              )}
            </h2>
            {currentTopic ? (
              <h3 className="ml-10 mb-10 font-mono">
                {currentTopicDescription}
              </h3>
            ) : null}
          </div>
        </div>

        {error ? (
          <ErrorComponent error={error} />
        ) : (
          <div className="flex flex-col ml-3">
            <div className="ml-10">
              <ArticlesListOptions
                setSortBy={setSortBy}
                setOrder={setOrder}
                currentTopic={currentTopic}
              />
            </div>
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
        )}
      </div>
    </div>
  );
};
export default Articles;
