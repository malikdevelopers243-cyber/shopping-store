import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
    const handleNavClick = (path) => {
    navigate(path);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <img 
        src="/images/Profile photo.png" 
        alt="Logo" 
        className="logo-image"
      />
          My Store
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/home" className="nav-link"  onClick={() => window.scrollTo(0, 0)}>
          
            Home
          </Link>
          <Link to="/products" className="nav-link" onClick={() => window.scrollTo(0, 0)}>
            Products
          </Link>
          <Link to="/deals" className="nav-link"  onClick={() => window.scrollTo(0, 0)}>
            Deals
          </Link>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            } onClick={() => window.scrollTo(0, 0)}
          >
            Contact
          </NavLink>
        </div>

        <div className="navbar-right">
          <form className="search-bar" onSubmit={handleSearchSubmit} role="search">
            <input
              type="search"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              ⌕
            </button>
          </form>

       <NavLink
          to="/cart"
          className={({ isActive }) =>
            `cart-icon${isActive ? ' cart-icon-active' : ''}`
          }
        >
  <img 
    src='/images/cart photo.png'
    alt="Cart" 
    className="cart-image"
  />

  {getTotalItems() > 0 && (
    <span className="cart-badge">{getTotalItems()}</span>
  )}
</NavLink>

          {user && (
            <div className="user-menu">
              <button className="user-btn">
                 {user.name.split(' ')[0]}
              </button>
              <div className="dropdown-menu">
                <Link to="/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <Link to="/orders" className="dropdown-item">
                  My Orders
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;