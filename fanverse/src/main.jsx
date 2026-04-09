import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Profile from './pages/Profile'
import GamePage from './pages/GamePage'
import Admin from './pages/Admin'
import SearchPage from "./pages/SearchPage";

import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/game/:game_id' element={<GamePage/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/search/:title" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)

