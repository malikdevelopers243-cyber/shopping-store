import React, { useState, useEffect, useRef } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;

    setMobileMenuOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
          <img
            src="/images/Profile photo.png"
            alt="Logo"
            className="logo-image"
          />
          My Store
        </Link>

        <div className="navbar-menu desktop-menu">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Cart
          </NavLink>
        </div>

        <div className="navbar-right">
          <form className="search-bar" onSubmit={handleSearchSubmit}>
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
            aria-label="Cart"
            onClick={closeMobileMenu}
          >
            <img
              src="/images/cart photo.png"
              alt="Cart"
              className="cart-image"
            />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </NavLink>

          <div className="user-menu" ref={userMenuRef}>
            <button
              className="user-btn"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {user?.name?.split(' ')[0] || 'Profile'}
            </button>
            <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
              <Link
                to="/dashboard"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/orders"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/settings"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
              <div className="dropdown-divider" />
              <button
                type="button"
                onClick={handleLogout}
                className="dropdown-item logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link
            to="/home"
            className="mobile-drawer-logo"
            onClick={closeMobileMenu}
          >
            <img
              src="/images/Profile photo.png"
              alt="Logo"
              className="logo-image"
            />
            My Store
          </Link>
          <button
            className="drawer-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-drawer-links">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? 'mobile-link mobile-link-active' : 'mobile-link'
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'mobile-link mobile-link-active' : 'mobile-link'
            }
            onClick={closeMobileMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'mobile-link mobile-link-active' : 'mobile-link'
            }
            onClick={closeMobileMenu}
          >
            Contact
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'mobile-link mobile-link-active' : 'mobile-link'
            }
            onClick={closeMobileMenu}
          >
            Cart
            {getTotalItems() > 0 && (
              <span className="mobile-link-badge">{getTotalItems()}</span>
            )}
          </NavLink>
          <button
            type="button"
            className="mobile-link mobile-link-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
