import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2> Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
        <button 
          onClick={() => navigate('/home')}
          className="btn-continue-shopping"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="cart-items-section">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">PKR {item.price.toLocaleString()}</p>
                </div>

                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="qty-input"
                  />
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  <img
                    src={encodeURI('/images/remove.png')}
                    alt="Remove item"
                    className="remove-icon"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-summary-section">
          <div className="cart-summary-card">
            <h2>Order Summary</h2>

            <div className="summary-item">
              <span>Subtotal</span>
              <span>PKR {getTotalPrice().toLocaleString()}</span>
            </div>

            <div className="summary-item">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>

            <div className="summary-item">
              <span>Tax (17%)</span>
              <span>PKR {(getTotalPrice() * 0.17).toLocaleString('en-PK', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span>Total</span>
              <span>PKR {(getTotalPrice() * 1.17).toLocaleString('en-PK', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="btn-checkout"
            >
               Proceed to Payment
            </button>

            <button 
              onClick={() => navigate('/home')}
              className="btn-continue"
            >
              ← Continue Shopping
            </button>

            <button 
              onClick={clearCart}
              className="btn-clear-cart"
            >
             Clear Cart
            </button>

            <div className="security-info">
              <img 
                src="/images/security.png" 
                alt="Secure"
                className="security-icon"
              />
              <p>Your payment is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;