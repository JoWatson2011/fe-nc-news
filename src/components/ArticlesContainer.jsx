import Articles from "./Articles";
import Article from "./Article";
import Home from "./Home";
import PostArticle from "./PostArticle";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
const ArticlesContainer = () => {
  const [listArticles, setlistArticles] = useState([]);
  const [article, setArticle] = useState({});
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/articles"
        element={
          <Articles
            listArticles={listArticles}
            setlistArticles={setlistArticles}
          />
        }
      />
      <Route path="/articles/:article_id" element={<Article article={article} setArticle={setArticle}/>} />
      <Route path="/articles/post" element={<PostArticle />} />
    </Routes>
  );
};

export default ArticlesContainer;
