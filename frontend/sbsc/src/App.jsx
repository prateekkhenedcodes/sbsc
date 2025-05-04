import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cute from './pages/Cuties/Cuties';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/app/" element={<Home />}/>
          <Route path="/app/explore/girls" element={<Cute />} />
          <Route path="/app/upload" element = {<Upload/>}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
