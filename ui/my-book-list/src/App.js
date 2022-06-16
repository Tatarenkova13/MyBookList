import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Readed } from './pages/Readed';
import { ReadNow } from './pages/ReadNow';
import { WillRead } from './pages/WillRead';
import { Genres } from './components/GenreTable';


function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <h3 className="d-flex justify-content-left m-3">
            MyBookList
          </h3>
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/">
                Прочитанные книги
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/readnow">
                Читаю сейчас
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link className="btn btn-light btn-outline-primary" to="/willread">
                Хочу прочитать
              </Link>
            </li>
            <li className="nav-item- m-1">
              <Link className="btn btn-outline-secondary" to="/genres">
                Жанры книг
              </Link>
            </li>
          </ul>
        </nav>

      
        <Routes>
          <Route path="/" element={<Readed />} />
          <Route path="/readnow" element={<ReadNow />} />
          <Route path="/willread" element={<WillRead />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
