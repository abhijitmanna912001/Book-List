import { Link, Route, BrowserRouter as Router, Routes } from "react-router";
import AuthorsPage from "./pages/AuthorsPage";
import BooksPage from "./pages/BooksPage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Book Store
          </Link>
          <div>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/authors">
                  Authors
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
