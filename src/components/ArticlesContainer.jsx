import Articles from "./Articles";
import Article from "./Article";
import Home from "./Home";
import PostArticle from "./PostArticle";
import { Route, Routes } from "react-router-dom";
const ArticlesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:topic?" element={<Articles />} />
      <Route path="/articles/:article_id" element={<Article />} />
      <Route path="/articles/post" element={<PostArticle />} />
    </Routes>
  );
};

export default ArticlesContainer;
