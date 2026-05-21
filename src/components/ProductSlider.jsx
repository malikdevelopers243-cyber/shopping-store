import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FEATURED_PRODUCTS } from '../data/products';
import '../styles/ProductSlider.css';

const ProductSlider = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const sliderProducts = FEATURED_PRODUCTS.slice(0, 8);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const AUTO_SLIDE_MS = 3500;

  const goToSlide = (index) => {
    const nextIndex = (index + sliderProducts.length) % sliderProducts.length;
    setActiveIndex(nextIndex);
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliderProducts.length);
    }, AUTO_SLIDE_MS);
  };

  const pauseAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePrev = () => {
    goToSlide(activeIndex - 1);
    startAutoSlide();
  };

  const handleNext = () => {
    goToSlide(activeIndex + 1);
    startAutoSlide();
  };

  const handleDotClick = (index) => {
    goToSlide(index);
    startAutoSlide();
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX > 0) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  return (
    <div
      className="product-slider"
      onMouseEnter={pauseAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider-header">
        <div>
          <p className="slider-label">Flash Sale</p>
          <h3>Hot picks</h3>
        </div>
        <span className="slider-timer">Auto</span>
      </div>

      <div className="slider-track">
        {sliderProducts.map((product, index) => (
          <div
            key={product.id}
            className={`slider-item ${index === activeIndex ? 'active' : ''}`}
          >
            {product.discount ? (
              <div className="slider-discount-badge">
                {product.discount}% OFF
              </div>
            ) : null}

            <div className="slider-image-wrap">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="slider-info">
              <p className="slider-product-name">{product.name}</p>
              <div className="slider-prices">
                {product.originalPrice ? (
                  <span className="slider-original-price">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                ) : null}
                <span className="slider-current-price">
                  PKR {product.price.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                className="slider-buy-btn"
                onClick={() => {
                  addToCart(product);
                  navigate('/payment');
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="slider-arrow slider-arrow-left"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="slider-arrow slider-arrow-right"
          onClick={handleNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className="slider-dots">
        {sliderProducts.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`slider-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
