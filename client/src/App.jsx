
import React from 'react'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Nav' 
import Home from './components/Home'
import Dashboard from './components/Dashbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
