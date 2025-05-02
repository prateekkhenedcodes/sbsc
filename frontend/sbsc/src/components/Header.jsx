import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">likethis</div>
    <nav className="nav-links">
      <a href="/">Comics</a>
      <a href="/">Store</a>
      <a href="/">About</a>
    </nav>
  </header>
);

export default Header;
