import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.scss';
import Layout from './components/Layout';
import './db';
import { ChatRoom } from './components/ChatRoom';
import { Home } from './components/Home';
import { NoMatch } from './components/NoMatch';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/p/:id' element={<ChatRoom />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  </React.StrictMode>
);
