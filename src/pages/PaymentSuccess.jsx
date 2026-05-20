import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon"></div>
        <h1>Payment Successful!</h1>
        <p>Your payment has been processed successfully</p>
        
        <div className="success-details">
          <div className="detail-item">
            <span>Order ID:</span>
            <strong>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
          </div>
          <div className="detail-item">
            <span>Status:</span>
            <strong className="status-success">Completed</strong>
          </div>
          <div className="detail-item">
            <span>Date & Time:</span>
            <strong>{new Date().toLocaleString()}</strong>
          </div>
        </div>

        <div className="success-message">
          <p> Thank you for your purchase!</p>
          <p>Your order will be shipped soon. You'll receive a confirmation email shortly.</p>
        </div>

        <button 
          className="btn-home"
          onClick={() => navigate('/home')}
        >
          Continue Shopping
        </button>

        <p className="redirect-text">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;