import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetail.css';

const COLOR_SWATCHES = {
  black: '#111827',
  grey: '#6b7280',
  white: '#f9fafb',
  red: '#ef4444',
  blue: '#2563eb',
  green: '#16a34a',
  yellow: '#f59e0b',
  brown: '#92400e',
  pink: '#db2777',
  purple: '#7c3aed',
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState('Punjab, Shujaabad, Shujaabad');
  const [loading, setLoading] = useState(true);

  const product = useMemo(
    () => FEATURED_PRODUCTS.find((item) => item.id === Number(productId)),
    [productId]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return FEATURED_PRODUCTS.filter(
      (item) => item.category === product.category && item.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const ratingDistribution = useMemo(() => {
    if (!product) return [];
    const total = product.reviews || 1;
    const weights = [0.45, 0.25, 0.15, 0.1, 0.05];
    return [5, 4, 3, 2, 1].map((star, index) => ({
      star,
      count: Math.max(1, Math.round(total * weights[index])),
      percent: Math.round(weights[index] * 100),
    }));
  }, [product]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timeout);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.image);
      setSelectedColor(product.colorOptions?.[0] ?? '');
      setSelectedSize(product.sizeOptions?.[0] ?? '');
      setQuantity(1);
    }
  }, [product]);

  const getColorBackground = (color) => {
    const key = color.toLowerCase();
    return COLOR_SWATCHES[key] || '#d1d5db';
  };

  const handleQuantity = (change) => {
    setQuantity((prev) => {
      if (!product) return prev;
      const next = prev + change;
      return Math.min(Math.max(1, next), product.stockQuantity);
    });
  };

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    addToCart({ ...product, quantity, selectedColor, selectedSize });
    showToast(`${product.name} added to cart.`, 'success');
  };

  const handleBuyNow = () => {
    if (!product || !product.inStock) return;
    handleAddToCart();
    navigate('/payment');
  };

  const handleWishlist = () => {
    showToast(`${product?.name} added to wishlist.`, 'success');
  };

  const handleShare = (channel) => {
    if (!product) return;
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => showToast(`Product link copied for ${channel}.`, 'success'))
      .catch(() => showToast('Copy failed. Try again.', 'error'));
  };

  const toggleLocationModal = () => {
    setShowLocationModal((prev) => !prev);
  };

  const locationOptions = [
    'Punjab, Shujaabad, Shujaabad',
    'Sindh, Karachi, Clifton',
    'KPK, Peshawar, University Town',
    'Balochistan, Quetta, Satellite Town',
  ];

  if (loading) {
    return <div className="detail-loading">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="detail-error">
        <h2>Product not found</h2>
        <p>We could not locate the product you requested.</p>
        <button className="btn-back" onClick={() => navigate('/products')}>
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="detail-topbar">
        <button type="button" className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Link to="/products" className="btn-secondary">
          Browse all products
        </Link>
      </div>

      <div className="detail-grid">
        <div className="detail-image-panel">
          <div className="detail-main-image">
            <img src={encodeURI(selectedImage)} alt={product.name} />
          </div>
          <div className="detail-thumbnails">
            {product.images.map((image, index) => (
              <button
                key={index}
                type="button"
                className={`thumbnail-button ${selectedImage === image ? 'active' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={encodeURI(image)} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-summary">
          <div className="detail-header">
            <h1>{product.name}</h1>
            <div className="detail-rating-row">
              <div className="detail-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className={index < Math.round(product.rating) ? 'filled' : ''}>
                    ★
                  </span>
                ))}
              </div>
              <button type="button" className="review-link" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>
                {product.reviews} reviews
              </button>
            </div>
          </div>

          <div className="detail-price-card compact">
            <div className="price-row">
              <span className="detail-current-price">PKR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="detail-original-price">PKR {product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && <span className="detail-discount">{product.discount}% OFF</span>}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="detail-savings">
                You save PKR {(product.originalPrice - product.price).toLocaleString()}
              </div>
            )}
          </div>

          <div className={`stock-pill ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </div>

          <p className="detail-description short-clamp">{product.fullDescription}</p>

          <div className="detail-specifications compact">
            <h2>Product specifications</h2>
            <table>
              <tbody>
                <tr>
                  <td>Dimensions</td>
                  <td>{product.specifications.dimensions}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{product.specifications.weight}</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>{product.specifications.material}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {(product.colorOptions?.length > 0 || product.sizeOptions?.length > 0) && (
            <div className="detail-options compact">
              {product.colorOptions?.length > 0 && (
                <div className="option-block">
                  <span>Color</span>
                  <div className="color-options">
                    {product.colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`color-pill ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          backgroundColor: getColorBackground(color),
                          color: ['black', 'blue', 'purple', 'red', 'green', 'brown'].includes(color.toLowerCase()) ? '#fff' : '#1f2937',
                        }}
                      >
                        <span>{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {product.sizeOptions?.length > 0 && (
                <div className="option-block">
                  <span>Size</span>
                  <div className="option-buttons">
                    {product.sizeOptions.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={selectedSize === size ? 'option-button active' : 'option-button'}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="quantity-card compact">
            <span>Quantity</span>
            <div className="quantity-controls">
              <button type="button" onClick={() => handleQuantity(-1)} disabled={quantity <= 1}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => handleQuantity(1)}>
                +
              </button>
            </div>
          </div>

          <div className="detail-actions compact">
            <button type="button" className="btn-primary" onClick={handleAddToCart} disabled={!product.inStock}>
              Add to Cart
            </button>
            <button type="button" className="btn-secondary" onClick={handleBuyNow} disabled={!product.inStock}>
              Buy Now
            </button>
          </div>

          <div className="additional-actions compact">
            <button type="button" className="action-pill" onClick={handleWishlist}>
              ♥ Wishlist
            </button>
            <button type="button" className="action-pill" onClick={() => handleShare('Copy link')}>
              Copy link
            </button>
          </div>

          <div className="detail-info-cards compact">
            <div className="info-card">
              <h3>Shipping</h3>
              <p>{product.shipping.deliveryTime}</p>
            </div>
            <div className="info-card">
              <h3>Return policy</h3>
              <p>{product.returnPolicy}</p>
            </div>
            <div className="info-card">
              <h3>Seller</h3>
              <p>{product.seller.name}</p>
            </div>
          </div>
        </div>

        <aside className="detail-delivery-panel">
          <div className="delivery-return-section">
            <div className="section-panel">
              <div className="section-heading-row">
                <h3>Delivery Options</h3>
                <span className="info-icon" title="Delivery estimate and pickup location">ℹ️</span>
              </div>
              <div className="delivery-item">
                <div className="item-icon">📍</div>
                <div className="item-content">
                  <div className="item-title">{location}</div>
                  <div className="item-subtitle">User location</div>
                </div>
                <div className="item-right">
                  <button type="button" className="change-link" onClick={toggleLocationModal}>
                    CHANGE
                  </button>
                </div>
              </div>
              <div className="delivery-item">
                <div className="item-icon">🚚</div>
                <div className="item-content">
                  <div className="item-title">Standard Delivery</div>
                  <div className="item-subtitle">Guaranteed by 27-30 May</div>
                </div>
                <div className="item-right">
                  <div className="price-text">Rs. 2,965</div>
                  <input type="radio" name="shipping-method" defaultChecked />
                </div>
              </div>
              <div className="delivery-item no-border">
                <div className="item-icon">💳</div>
                <div className="item-content">
                  <div className="item-title">Cash on Delivery Available</div>
                  <div className="item-subtitle">Pay when your order arrives</div>
                </div>
                <div className="item-right">
                  <span className="checkmark">✔️</span>
                </div>
              </div>
            </div>

            <div className="section-panel">
              <div className="section-heading-row">
                <h3>Return & Warranty</h3>
                <span className="info-icon" title="Return policy and warranty details">ℹ️</span>
              </div>
              <div className="delivery-item">
                <div className="item-icon">↩️</div>
                <div className="item-content">
                  <div className="item-title">14 days easy return</div>
                  <div className="item-subtitle">Return within 14 days for a full refund</div>
                </div>
                <div className="item-right">
                  <span className="easy-return">Easy</span>
                </div>
              </div>
              <div className="delivery-item no-border">
                <div className="item-icon">🛡️</div>
                <div className="item-content">
                  <div className="item-title">Warranty not available</div>
                  <div className="item-subtitle">This item does not include a manufacturer warranty</div>
                </div>
                <div className="item-right">
                  <span className="disabled-text">Unavailable</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showLocationModal && (
        <div className="location-modal-overlay" onClick={toggleLocationModal}>
          <div className="location-modal" onClick={(event) => event.stopPropagation()}>
            <h4>Select delivery location</h4>
            <div className="location-list">
              {locationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`location-option ${location === option ? 'active' : ''}`}
                  onClick={() => setLocation(option)}
                >
                  <span>{option}</span>
                  {location === option && <span>Selected</span>}
                </button>
              ))}
            </div>
            <div className="location-footer">
              <button type="button" className="location-button" onClick={toggleLocationModal}>
                Cancel
              </button>
              <button type="button" className="location-button confirm" onClick={toggleLocationModal}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="related-products">
        <div className="section-heading">
          <h2>Related products</h2>
          <p>More items from {product.category}</p>
        </div>
        <div className="related-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="section-heading">
          <h2>Customer reviews</h2>
          <p>Rating distribution and verified feedback</p>
        </div>
        <div className="reviews-grid">
          <div className="reviews-summary-card">
            <div className="reviews-rating-large">{product.rating.toFixed(1)}</div>
            <div className="reviews-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < Math.round(product.rating) ? 'filled' : ''}>
                  ★
                </span>
              ))}
            </div>
            <p>{product.reviews} reviews</p>
          </div>
          <div className="rating-distribution">
            {ratingDistribution.map((item) => (
              <div key={item.star} className="distribution-row">
                <span>{item.star}★</span>
                <div className="distribution-bar">
                  <div className="distribution-fill" style={{ width: `${item.percent}%` }} />
                </div>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="review-list">
          {product.reviewSamples.slice(0, 3).map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <strong>{review.author}</strong>
                <span>{review.rating} ★</span>
              </div>
              <p>{review.comment}</p>
              <span className="review-date">{review.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
