// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Settings from "./pages/Settings/Settings";
import Main from "./pages/Main/Main";
import History from "./pages/History/History";
import { LanguageProvider } from "./components/Other/LanguageProvider/LanguageProvider";
import Login from "./pages/Login/Login";
import AuthProvider from "./components/Other/authContext/AuthProvider";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import { useAuth } from "./components/Other/authContext/useAuth";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

function AppRoutes() {
  const { authState, isLoading, logout, isAdmin } = useAuth();

  // Добавляем проверку состояния загрузки
  if (isLoading) {
    return (
      <div className="spinner__container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!authState.isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div>
      <Header username={authState.username} onLogoutSuccess={logout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        {isAdmin && <Route path="/admin-panel" element={<AdminDashboard />} />}
      </Routes>
    </div>
  );
}

export default App;