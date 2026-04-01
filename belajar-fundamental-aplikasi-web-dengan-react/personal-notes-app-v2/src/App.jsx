import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { 
  getUserLogged, 
  putAccessToken, 
  putLocaleState,
  putThemeState,
  getAccessToken,
  getLocaleState,
  getThemeState, 
} from "./utils/api";

import Navigation from "./components/Navigation"

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ArchivePage from "./pages/ArchivePage"
import NewNotePage from "./pages/NewNotePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [theme, setTheme] = React.useState(getThemeState() || 'light');
  const [locale, setLocale] = React.useState(getLocaleState() || 'id');
  const [initializing, setInitializing] = React.useState(true);
  
  const loginHandler = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    
    setAuthedUser(data);
  }

  const logoutHandler = () => {
    setAuthedUser(null);
    putAccessToken('');
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    putThemeState(newTheme);
  }

  const toggleLocale = () => {
    const newLocale = locale === 'id' ? 'en' : 'id'
    setLocale(newLocale);
    putLocaleState(newLocale);
  }

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    const init = async () => {
      const token = getAccessToken();
      if (token) {
        await loginHandler({ accessToken: token });
      } 
      setInitializing(false);
    };

    init();
  }, []);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={theme}>
        <LocaleContext.Provider value={locale}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>  
              </h1>
              <Navigation toggleTheme={toggleTheme} toggleLocale={toggleLocale} />
            </header>
            <main>
              <Routes>
                <Route path='/*' element={<LoginPage loginSuccess={loginHandler}/>} />
                <Route path='/register' element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    )
  }
  
  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={locale}>
        <div className="app-container">
          <header>
            <h1><Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
            <Navigation toggleTheme={toggleTheme} onLogout={logoutHandler} name={authedUser.name} toggleLocale={toggleLocale}/>
          </header>
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/notes/new' element={<NewNotePage />} />
              <Route path='/notes/:id' element={<DetailPage />} />
              <Route path='/archives' element={<ArchivePage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
