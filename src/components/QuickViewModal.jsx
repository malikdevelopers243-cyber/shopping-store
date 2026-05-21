import React, { useEffect, useState } from 'react';
import '../styles/QuickViewModal.css';

const QuickViewModal = ({ product, onClose, onAddToCart, onBuyNow, onShowReviews }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 200);
  };

  if (!product) return null;

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className={`quickview-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      <div className={`quickview-modal ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="quickview-close" onClick={handleClose}>
          ×
        </button>
        <div className="quickview-body">
          <div className="quickview-image-panel">
            <img src={product.image} alt={product.name} className="quickview-image" />
          </div>
          <div className="quickview-details">
            <h2>{product.name}</h2>
            <div className="quickview-meta">
              <span className="quickview-stars">{product.rating.toFixed(1)} ★</span>
              <button type="button" className="quickview-reviews" onClick={onShowReviews}>
                {product.reviews} reviews
              </button>
            </div>
            <div className="quickview-price-row">
              {product.originalPrice && (
                <span className="quickview-original-price">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="quickview-current-price">
                PKR {product.price.toLocaleString()}
              </span>
              {product.discount && <span className="quickview-discount">{product.discount}% OFF</span>}
            </div>
            {savings > 0 && (
              <p className="quickview-savings">You save PKR {savings.toLocaleString()}</p>
            )}
            <p className={`quickview-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In stock' : 'Out of stock'}
            </p>
            <p className="quickview-description">{product.shortDescription}</p>
            <div className="quickview-actions">
              <button type="button" className="btn-quickview-primary" onClick={onAddToCart}>
                Add to Cart
              </button>
              <button type="button" className="btn-quickview-secondary" onClick={onBuyNow}>
                Buy Now
              </button>
            </div>
            <div className="quickview-footer">
              <span>{product.stockQuantity} available</span>
              <span>{product.returnPolicy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
