import Articles from "./Articles";
import Article from "./Article";
import { Route, Routes } from "react-router-dom";
const ArticlesContainer = () => {
  return (
    <Routes>
      <Route path="/" ele={<Home />} />
      <Route path="/articles/:topic?" ele={<Articles />} />
      <Route path="/articles/:article_id" ele={<Article />} />
      <Route path="/post"/>
    </Routes>
  );
};

export default ArticlesContainer;
