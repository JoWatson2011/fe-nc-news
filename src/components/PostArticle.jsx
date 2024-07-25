import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useContext } from "react";
import { TopicsContext } from "../contexts/TopicsContext";
import Loading from "./Loading";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import PublishIcon from "@mui/icons-material/Publish";

const PostArticle = () => {
  const { topics, awaitingTopics } = useContext(TopicsContext);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <h2 className=" font-mono text-[30px] ml-6">Post an article</h2>
      <div className="m-auto w-[80%]">
        <Button variant="outlined" startIcon={<ReplayIcon />}>
          Reset
        </Button>
        <form onSubmit={handleSubmit}>
          {awaitingTopics ? (
            <Loading />
          ) : (
            <div>
              <Select
                label="Select Topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="Select a topic"
                className="w-[50%]"
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
                <TextField
                  label="New topic name"
                  value={newTopic}
                  onChange={(e) => {
                    setNewTopic(e.target.value);
                  }}
                />
              ) : null}
            </div>
          )}

          <TextField
            label="Title"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            margin="normal"
            className="w-full"
          />
          <TextField
            label="Body"
            multiline
            rows={4}
            value={articleBody}
            onChange={(e) => setArticleBody(e.target.value)}
            margin="normal"
            className="w-full"
          />
          <Button type="submit" variant="outlined" startIcon={<PublishIcon />}>
            Post Article
          </Button>
        </form>
      </div>
    </main>
  );
};
export default PostArticle;
