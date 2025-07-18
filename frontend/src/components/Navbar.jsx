import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';
import logo from '../assets/ssr logo.png'; // ✅ Import your logo image

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantityKg, 0);

  return (
    <nav className="navbar-container shadow-sm">
      <div className="navbar-content">
        <Link className="logo" to="/">
          <img 
            src={logo} 
            className="logo-img" // ✅ You can style this in CSS
          />
          <span className="logo-text"></span>
        </Link>

        <div className="nav-links">
          <Link to="/cart" className="cart-btn">
            🛒 Cart 
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
