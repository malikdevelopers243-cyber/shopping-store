import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
   const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
     showToast(` ${product.name} added to cart!`, 'success');
  };
   const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product);
    navigate('/payment');
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          {product.discount && (
            <div className="discount-badge">{product.discount}% OFF</div>
          )}
          <div className="product-overlay">
            <button className="btn-quick-view">Quick View</button>
          </div>
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

        <button
          onClick={handleAddToCart}
          className="btn-add-cart"
        >
           Add to Cart
        </button>
         <button
          onClick={handleBuyNow}
          className="btn-add-cart"
        >
           Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;