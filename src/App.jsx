import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticlesContainer from "./components/ArticlesContainer";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <ArticlesContainer className = "ml-20"/>
    </BrowserRouter>
  );
}

export default App;
