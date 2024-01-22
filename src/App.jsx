import { useState, useEffect } from 'react';
// React Router
import { Routes, Route } from 'react-router-dom';
import './style/App.scss';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Editor from './pages/Editor';
import PageNotFound from './pages/PageNotFound';

import { auth } from './firebase/firebaseConfig';
import { getRedirectResult } from 'firebase/auth';
import Loading from './components/Loading';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    async function isLogIn() {
      const response = await getRedirectResult(auth)
        .then((result) => {
          const user = result.user;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            return true;
          }
          return false;
        })
        .catch((error) => {});
      if (response) {
        setIsLogin(true);
        setIsLoading(false);
      } else if (localStorageUser !== null) {
        setIsLogin(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    isLogIn();
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
          <Route path='/editor' element={<Editor />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
}

export default App;
