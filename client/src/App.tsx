import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
import AuthorsPage from "./pages/AuthorsPage";
import BooksPage from "./pages/BooksPage";

function App() {
  return (
    <Router>
      <nav style={{ margin: "1rem" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Books
        </Link>
        <Link to="/authors">Authors</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
