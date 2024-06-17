import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import ArticlesContainer from "./components/ArticlesContainer"
function App() {
    return (
        <BrowserRouter>
            <Header />
            <ArticlesContainer />
        </BrowserRouter>
    )
}

export default App
