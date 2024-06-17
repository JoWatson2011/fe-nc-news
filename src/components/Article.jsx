import { useParams } from "react-router-dom";
const Article = ({article, setArticle}) => {
  const { article_id } = useParams();
  return <p>{article_id}</p>;
};
export default Article;
