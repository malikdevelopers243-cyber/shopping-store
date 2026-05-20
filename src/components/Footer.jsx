import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column footer-column-about">
            <h4>About My Store</h4>
            <p>Your trusted online shopping destination for quality products at unbeatable prices.</p>
            <div className="social-icons">
              {/* <a href="#" title="Facebook">f</a>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="Instagram">📷</a>
              <a href="#" title="LinkedIn">in</a> */}

              <div className="social-icons">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
    <i className="fab fa-linkedin-in"></i>
  </a>
  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
    <i className="fab fa-youtube"></i>
  </a>
</div>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#deals">Special Deals</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Support</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#track">Track Order</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} My Store. All rights reserved.</p>
          <div className="payment-methods" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
