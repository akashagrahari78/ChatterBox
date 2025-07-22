import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';
import LeftSidebar from './components/LeftSidebar'


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
    <Route path='/' element = { <LeftSidebar/>} />
    <Route path='/login' element = {<Login/>} />
    <Route path='/signup' element = {<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App