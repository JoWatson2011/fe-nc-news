import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import PublishIcon from "@mui/icons-material/Publish";
import InputLabel from "@mui/material/InputLabel";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopicsContext } from "../contexts/TopicsContext";
import { TopicsDispatchContext } from "../contexts/TopicsContext";
import { UserContext } from "../contexts/UserContext";
import { postRequest } from "../utils/api";
import Loading from "./Loading";

const PostArticle = () => {
  const { topics, awaitingTopics } = useContext(TopicsContext);
  const dispatch = useContext(TopicsDispatchContext);
  const { userDetails } = useContext(UserContext);

  const navigate = useNavigate();

  if (!userDetails.username) navigate("/login");

  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleImg, setArticleImg] = useState("");
  const [articlePosted, setArticlePosted] = useState("No");
  const [fieldsNotFilled, setFieldsNotFilled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopic) {
      postRequest("/api/topics/", {
        slug: newTopic,
        description: newTopicDescription,
      }).then(({ topic }) => {
        dispatch({ type: "added", data: topic });
        setSelectedTopic(topic.slug);
      });
    }

    if (
      !articleTitle ||
      !articleBody ||
      !userDetails.username ||
      !selectedTopic
    ) {
      setFieldsNotFilled(true);
      return;
    }

    const postRequestParams = {
      title: articleTitle,
      topic: selectedTopic,
      author: userDetails.username,
      body: articleBody,
      article_img_url: articleImg,
    };

    postRequest("/api/articles", postRequestParams)
      .then(({ article }) => {
        setArticlePosted("success");
        setTimeout(() => {
          setSelectedTopic("");
          setNewTopic("");
          setArticleTitle("");
          setArticleBody("");
          setArticleImg("");
          navigate(`/articles/${article.article_id}`);
        }, 3000);
      })
      .catch(() => {
        setArticlePosted("error");
      });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSelectedTopic("");
    setNewTopic("");
    setArticleTitle("");
    setArticleBody("");
    setArticleImg("");
  };

  const formInputStyleProps = { sx: { borderRadius: "30px" } };
  return (
    <main>
      <h2 className=" font-mono text-[30px] ml-6">Post an article</h2>
      <h3 className="ml-6">
        {" "}
        You are logged in as{" "}
        <Link to="/account" className="text-red-700">
          {userDetails.username}
        </Link>
      </h3>
      <div className="m-auto w-[80%] flex flex-col">
        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={handleReset}
          className="place-self-end"
          sx={{
            borderRadius: "30px",
            color: "darkred",
            border: "1px solid darkred",
          }}
        >
          Reset
        </Button>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {awaitingTopics ? (
            <Loading />
          ) : (
            <div>
              <p> * indicates required field</p>
              {fieldsNotFilled ? (
                <p className=" text-red-700 mb-5">
                  Please fill in all required fields
                </p>
              ) : null}
              <InputLabel htmlFor="select-topic">Select topic *</InputLabel>
              <Select
                id="select-topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="Select a topic"
                className="w-[70%]"
                sx={{ borderRadius: "30px" }}
              >
                {[...topics, { slug: "Create new topic..." }].map((topic) => {
                  return (
                    <MenuItem key={topic.slug} value={topic.slug}>
                      {topic.slug}
                    </MenuItem>
                  );
                })}
              </Select>
              {selectedTopic === "Create new topic..." ? (
                <div className="flex items-center justify-stretch w-[70%] mt-3">
                  <div className="w-full mr-3">
                    <InputLabel htmlFor="new-topic-name">
                      New Topic Name *
                    </InputLabel>
                    <TextField
                      id="new-topic-name"
                      value={newTopic}
                      placeholder="Marshmallows"
                      onChange={(e) => {
                        setNewTopic(e.target.value);
                      }}
                      className="w-full"
                      InputProps={formInputStyleProps}
                    />
                  </div>
                  <div className="w-full">
                    <InputLabel htmlFor="topic-description">
                      Describe your new topic *
                    </InputLabel>
                    <TextField
                      id="new-topic-name"
                      value={newTopicDescription}
                      placeholder="Fluffy pillows for your mouth"
                      onChange={(e) => {
                        setNewTopicDescription(e.target.value);
                      }}
                      className="w-full"
                      InputProps={formInputStyleProps}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <TextField
            label="Title *"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            margin="normal"
            className="w-full"
            InputProps={formInputStyleProps}
          />
          <TextField
            label="Body *"
            multiline
            rows={4}
            value={articleBody}
            onChange={(e) => setArticleBody(e.target.value)}
            margin="normal"
            className="w-full"
            InputProps={formInputStyleProps}
          />
          <TextField
            label="Article Image (URL)"
            value={articleImg}
            onChange={(e) => setArticleImg(e.target.value)}
            margin="normal"
            className="w-full"
            InputProps={formInputStyleProps}
          />
          <Button
            type="submit"
            variant="outlined"
            startIcon={<PublishIcon />}
            sx={{
              borderRadius: "30px",
              color: "darkred",
              border: "1px solid darkred",
            }}
            className="place-self-center"
          >
            Post Article
          </Button>
        </form>
        {articlePosted === "success" ? (
          <p className="text-green-700">
            Article Posted! Navigating to new article...
          </p>
        ) : null}
        {articlePosted === "error" ? (
          <p className="text-red-700">
            Error posting article. Please try again later.
          </p>
        ) : null}
      </div>
    </main>
  );
};
export default PostArticle;
