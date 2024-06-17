import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../utils/api";
const Article = ({ article, setArticle }) => {
  const { article_id } = useParams();

  console.log(article_id);
  useEffect(() => {
    getRequest(`/api/articles/${article_id}`, { params: { article_id } }).then(
      ({ article }) => {
        setArticle(article);
      }
    );
  }, [article_id]);
  
  return <p>{article_id}</p>;
};
export default Article;
