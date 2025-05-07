import React from 'react';
import './Header.css';
import logoImg from '../assets/cutie.png'; // Import the image

const Header = () => (
  <header className="header">
    <div className="logo">
      <a href='/'>
        <img src={logoImg} alt="Logo" />
      </a>
    </div>
    <nav className="nav-links">
      <a href="/app/explore/girls">Explore</a>
      <a href="/app/upload">Upload</a>
      <a href="/">About</a>
    </nav>
  </header>
);

export default Header;
