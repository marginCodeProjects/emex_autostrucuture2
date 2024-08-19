import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Settings from "./pages/Settings/Settings";
import Main from "./pages/Main/Main";
import History from "./pages/History/History";
import { LanguageProvider } from "./components/LanguageProvider/LanguageProvider";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/cookies";
import Login from "./pages/Login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки

  const handleLoginSuccess = (isSuccess: boolean) => {
    setIsAuthenticated(isSuccess);
  };

  useEffect(() => {
    const token = getCookie('access_token');
    setIsAuthenticated(!!token);
    setIsLoading(false); // Завершаем загрузку после проверки токена
  }, []);

  if (isLoading) {
    // Можно вернуть спиннер или просто пустой div во время загрузки
    return <div>Loading...</div>;
  }

  return (
    <LanguageProvider>
      <Router>
        <div>
          {isAuthenticated && <Header onLogoutSuccess={handleLoginSuccess} />}
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<Settings />} />
                <Route path="/contact" element={<History />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;