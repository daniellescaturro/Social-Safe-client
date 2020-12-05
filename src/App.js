import React, { Component } from 'react'
import LoginRegisterContainer from './LoginRegisterContainer'
import Navbar from './Navbar'
import HomeContainer from './HomeContainer'


import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LoginRegisterContainer />

    </div>
  )
}

export default App
