import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Profile from './pages/Profile'
import GamePage from './pages/GamePage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/gamePAge' element={<GamePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

