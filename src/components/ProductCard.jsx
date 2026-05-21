import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import QuickViewModal from './QuickViewModal';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleBuyNow = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    addToCart(product);
    navigate('/payment');
  };

  const openQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          <img
            src={encodeURI(product.image)}
            alt={product.name}
            className="product-image"
          />
          {product.discount && (
            <div className="discount-badge">{product.discount}% OFF</div>
          )}
        </div>
      </Link>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        {/* <div className="product-rating">
          <span className="stars"> {product.rating}/5</span>
          <span className="review-count">({product.reviews} reviews)</span>
        </div> */}

        <p className="product-category">{product.category}</p>

        <div className="product-price">
          {product.originalPrice && (
            <span className="original-price">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="current-price">
            PKR {product.price.toLocaleString()}
          </span>
        </div>

        <button onClick={openQuickView} className="btn-quick-view card-quick-view">
          Quick View
        </button>

        <button onClick={handleAddToCart} className="btn-add-cart">
          Add to Cart
        </button>
        <button onClick={handleBuyNow} className="btn-add-cart">
          Buy Now
        </button>
      </div>

      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onShowReviews={() => {
            navigate(`/product/${product.id}#reviews`);
            setIsQuickViewOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductCard;