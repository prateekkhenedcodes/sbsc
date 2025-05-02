import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dummy from './pages/Dummy';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/app" element={<Home />} />
          <Route path="/app/dummy" element={<Dummy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
