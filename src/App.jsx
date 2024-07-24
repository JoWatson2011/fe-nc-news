import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticlesContainer from "./components/ArticlesContainer";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <ArticlesContainer />
    </BrowserRouter>
  );
}

export default App;
