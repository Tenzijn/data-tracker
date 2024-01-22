import { useState, useEffect } from 'react';
// React Router
import { Routes, Route } from 'react-router-dom';
import './style/App.scss';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

import { auth } from './firebase/firebaseConfig';
import Loading from './components/Loading';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // for popup login with google
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLogin(true);
        setIsLoading(false);
      } else if (localStorageUser !== null) {
        setIsLogin(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const logInSuccessful = () => {
    setIsLogin(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !isLogin ? (
        <Routes>
          <Route
            path='/'
            element={<Login logInSuccessful={logInSuccessful} />}
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
