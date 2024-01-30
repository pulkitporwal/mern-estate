import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Signin from "./pages/Signin.jsx"
import Signup from "./pages/Signup.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/Signin'} element={<Signin/>}/>
          <Route path={'/signup'} element={<Signup/>}/>
          <Route path={'/about'} element={<About/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
