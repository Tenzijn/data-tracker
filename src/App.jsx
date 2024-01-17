// React Router
import { Routes, Route } from 'react-router-dom';
import './style/App.scss';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Editor from './pages/Editor';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/editor' element={<Editor />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
