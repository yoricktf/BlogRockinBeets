import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import UserRecipesPage from './pages/UserRecipesPage';
import NewRecipePage from './pages/NewRecipePage';

function App() {
  return (
    <div className="App">
      <h1>Main page</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:user/recipes" element={<UserRecipesPage />} />
        <Route path="/:user/recipes/:id" element={<NewRecipePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
