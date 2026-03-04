import { useState , useEffect } from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'

function App() {
  const { authUser , checkAuth , isCheckingAuth , onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  console.log("Online Users",onlineUsers);

  if (isCheckingAuth && !authUser) return (
    <div className='flex item-center justify-center h-screen ' >
      <Loader className='size-10 animate-spin ' />
    </div>
  )

  return (
    <div  data-theme={theme} className='overflow-hidden' >
      <Navbar />
      <Routes>
          <Route path='/' element={ authUser ? <HomePage /> : <Navigate to={"/login"} /> } />
          <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to={'/'} /> } />
          <Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to={'/'} /> } />
          <Route path='/settings' element={ <SettingsPage /> } />
          <Route path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to={'/login'} /> } />
      </Routes>

      <Toaster
      position='bottom-right'
      />
    </div>
  )
}

export default App
