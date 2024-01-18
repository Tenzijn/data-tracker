// React Router
import { Routes, Route } from 'react-router-dom';
import './style/App.scss';

import { handleSubmit, handleDelete } from './handles/firebaseHandler';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Editor from './pages/Editor';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <button
        onClick={() => {
          handleSubmit({
            title: 'test title',
            content: 'test content',
            date: 'test date',
            time: 'test time',
            uid: 'test uid',
          });
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          handleDelete('L2WpTYVl6GHybpgqXALk');
        }}
      >
        delete
      </button>
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
