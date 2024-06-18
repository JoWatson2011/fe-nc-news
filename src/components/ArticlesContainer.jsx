import Articles from "./Articles";
import Article from "./Article";
import Home from "./Home";
import PostArticle from "./PostArticle";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
const ArticlesContainer = () => {
  const [listArticles, setlistArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        path="/articles/:topic?"
        element={
          <Articles
            listArticles={listArticles}
            setlistArticles={setlistArticles}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
      />
      <Route path="/articles/:article_id" element={<Article />} />
      <Route path="/articles/post" element={<PostArticle />} />
    </Routes>
  );
};

export default ArticlesContainer;
