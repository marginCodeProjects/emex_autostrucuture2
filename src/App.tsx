import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from "./components/Header/Header";
import Settings from "./pages/Settings/Settings";
import Main from "./pages/Main/Main";
import History from "./pages/History/History";
import { LanguageProvider } from "./components/LanguageProvider/LanguageProvider";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/utils";
import Login from "./pages/Login/Login";
import { AuthState } from "./interfaces/Main";


function App() {
  const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, username: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки
  const [CheckesAuth, setCheckesAuth] = useState(1)
  const handleLoginSuccess = (isSuccess: boolean, username: string) => {
    setAuthState({ isAuthenticated: isSuccess, username });
  };
  setInterval(() => {
    setCheckesAuth((prev) => prev += 1)
  }, 10000);
  useEffect(() => {
    const token = getCookie('access_token');
    const username = localStorage.getItem('username')
    if (token && username) {
      setAuthState({ isAuthenticated: true, username: username });
    }
    setIsLoading(false); // Завершаем загрузку после проверки токена
  }, [CheckesAuth]);

  if (isLoading) {
    // Можно вернуть спиннер или просто пустой div во время загрузки
    return <></>;
  }

  return (
    <LanguageProvider>
      <Router>
        <div>
          {authState.isAuthenticated && <Header username={authState.username} onLogoutSuccess={() => handleLoginSuccess(false, "")} />}
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            {authState.isAuthenticated ? (
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