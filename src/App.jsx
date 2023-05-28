import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import HomePage from './pages/HomePage/HomePage';
import SeatsPage from './pages/SeatsPage/SeatsPage';
import SessionsPage from './pages/SessionsPage/SessionsPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import NavBar from './components/NavBar';


export default function App() {
  axios.defaults.headers.common['Authorization'] = 'bi36KxjyUZs9BcF0fWGCap1D';

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/sessoes/:idFilme' element={<SessionsPage />} />
          <Route path='/assentos/:idSessao' element={<SeatsPage />} />
          <Route path='/sucesso' element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
     </>
  )
}


