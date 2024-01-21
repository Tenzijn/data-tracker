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
function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function isLogIn() {
      const response = await getRedirectResult(auth);
      if (response) {
        setIsLogin(true);
      }
    }
    isLogIn();
  }, []);

  const logInSuccessful = () => {
    setIsLogin(true);
  };

  return (
    <>
      {!isLogin ? (
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
