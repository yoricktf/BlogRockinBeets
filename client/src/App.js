import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserRecipesPage from './pages/UserRecipesPage';
import NewRecipePage from './pages/NewRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/recipes/:id/edit' element={
          <ProtectedRoute redirectTo='/login'>
            <EditRecipePage />
          </ProtectedRoute>
        }
        />
        <Route path='/recipes/new' element={
          <ProtectedRoute redirectTo='/login'>
            <NewRecipePage />
          </ProtectedRoute>
        }
        />
        <Route path='/settings' element={
          <ProtectedRoute redirectTo='/login'>
            <SettingsPage />
          </ProtectedRoute>
        }
        />


        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
