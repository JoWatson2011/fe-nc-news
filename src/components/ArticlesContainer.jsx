import Articles from "./Articles";
import Article from "./Article";
import Home from "./Home";
import PostArticle from "./PostArticle";
import LogIn from "./LogIn";
import MyAccount from "./MyAccount";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ErrorPage from "./ErrorPage";

const ArticlesContainer = () => {
  const [listArticles, setlistArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            listArticles={listArticles}
            setlistArticles={setlistArticles}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
      />
      <Route
        path="/articles"
        element={
          <Articles
            listArticles={listArticles}
            setlistArticles={setlistArticles}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
      />
      <Route
        path="/articles/:article_id"
        element={<Article article={article} setArticle={setArticle} />}
      />
      <Route path="/articles/post" element={<PostArticle />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default ArticlesContainer;
