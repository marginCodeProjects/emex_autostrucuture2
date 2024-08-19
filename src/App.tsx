import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  const handleLoginSuccess = (isSuccess: boolean) => {
    setIsAuthenticated(isSuccess);
  };
  useEffect(() => {
    // Проверяем наличие cookie при загрузке компонента
    const token = getCookie('access_token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  return (
    <LanguageProvider>
      <Router>
        <div>
          {isAuthenticated ? (
            <>
              <Header onLogoutSuccess={handleLoginSuccess} />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<Settings />} />
                <Route path="/contact" element={<History />} />
              </Routes>
            </>
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;