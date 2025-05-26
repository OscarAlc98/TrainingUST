import './App.css';
// @ts-ignore
import ProjectsPage from './projects/ProjectsPage';
import { BrowserRouter, Routes, Route, NavLink} from 'react-router';
// @ts-ignore
import HomePage from './home/HomePage';
// @ts-ignore
import ProjectPage from './projects/ProjectPage';
// @ts-ignore
import NewProject from './newProject/NewProject';

function App() {
  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>
        <NavLink to="/"  className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
        <NavLink to="/newProject" className="button rounded">
          New Project
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newProject" element={<NewProject />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;