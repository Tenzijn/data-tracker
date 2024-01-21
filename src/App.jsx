import { useState } from 'react';
// React Router
import { Routes, Route } from 'react-router-dom';
import './style/App.scss';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Editor from './pages/Editor';
import PageNotFound from './pages/PageNotFound';

function App() {
  const [isLogin, setIsLogin] = useState(false);

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
