import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import AuthForm from './components/AuthForm'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<AuthForm  />} />
          <Route path="/signup" element={<AuthForm  />} />
      </Routes>
    </div>
  )
}

export default App