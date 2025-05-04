import React from 'react';
import './Header.css';
import logoImg from '../assets/cutie.png'; // Import the image

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={logoImg} alt="Logo" />
    </div>
    <nav className="nav-links">
      <a href="/">Comics</a>
      <a href="/">Store</a>
      <a href="/">About</a>
    </nav>
  </header>
);

export default Header;
