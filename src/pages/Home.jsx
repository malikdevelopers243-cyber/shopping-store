import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FEATURED_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (

       <div className="home-container">
      <section className="hero-section" style={{
        backgroundImage: `url('/images/login photo.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Welcome, {user?.name.split(' ')[0]}..!</h1>
              <p>Discover amazing products at unbeatable prices</p>
              <div className="hero-buttons">
                <button
                  onClick={() => navigate('/products')}
                  className="btn-primary"
                >
                 Start Shopping
              </button>
              <button className="btn-secondary">
                 View Deals
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div
            className="category-card"
            onClick={() => navigate('/products', { state: { category: 'Electronics' } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/products', { state: { category: 'Electronics' } })}
          >
             <img src="/images/Electronics.png" alt="Electronics" className="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div
            className="category-card"
            onClick={() => navigate('/products', { state: { category: 'Fashion' } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/products', { state: { category: 'Fashion' } })}
          >
             <img src="/images/Fashion.png" alt="Fashion" className="Fashion" />
            <h3>Fashion</h3>
          </div>
          <div
            className="category-card"
            onClick={() => navigate('/products', { state: { category: 'Home & Living' } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/products', { state: { category: 'Home & Living' } })}
          >
             <img src="/images/Home.png" alt="Home & Living" className="Home" />
            <h3>Home & Living</h3>
          </div>
          <div
            className="category-card"
            onClick={() => navigate('/products', { state: { category: 'Gaming' } })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/products', { state: { category: 'Gaming' } })}
          >
            <img src="/images/Gaming.png" alt="Gaming" className="Gaming" />
            <h3>Gaming</h3>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-card">
             <img src="/images/Fast.png" alt="Home" className="Fast" />
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders above PKR 2000</p>
          </div>
          <div className="benefit-card">
            <img src="/images/secure payments.png" alt="Home" className="Secure" />
            <h3>Secure Payment</h3>
            <p>100% secure transactions</p>
          </div>
          <div className="benefit-card">
            <img src="/images/Easy returns.png" alt="Home" className="Returns" />
            <h3>Easy Returns</h3>
            <p>30-day return guarantee</p>
          </div>
          <div className="benefit-card">
            <img src="/images/best qualty.png" alt="Home" className="Qualty" />
            <h3>Best Quality</h3>
            <p>Authentic products only</p>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Handpicked items just for you</p>
        </div>
        <div className="products-grid">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>




      <section className="cta-section">
        <div className="cta-content">
          <h2>Special Offer for You!</h2>
          <p>Get 20% off on your first order with code "Asad"</p>
          <button className="btn-cta">Claim Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
