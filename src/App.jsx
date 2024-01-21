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
import { Flex, Spinner } from '@chakra-ui/react';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function isLogIn() {
      const response = await getRedirectResult(auth);
      if (response) {
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
        <Flex h={'100vh'} alignItems='center' justifyContent='center'>
          <Spinner size={'xl'} />
        </Flex>
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
