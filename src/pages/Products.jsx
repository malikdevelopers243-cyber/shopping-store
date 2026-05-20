import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FEATURED_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(FEATURED_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Categories extract karo
  const categories = ['All', ...new Set(FEATURED_PRODUCTS.map(p => p.category))];

  // If navigated from Home with a category in state or via query param, apply it on mount
  useEffect(() => {
    const stateCategory = location?.state?.category;
    const params = new URLSearchParams(location.search);
    const qCategory = params.get('category');
    const initialCat = stateCategory || qCategory;
    if (initialCat) {
      // normalize 'Home&Living' or similar spacing
      const match = categories.find(c => c.toLowerCase().replace(/\s|&/g, '') === initialCat.toLowerCase().replace(/\s|&/g, ''));
      if (match) handleCategoryFilter(match);
      else handleCategoryFilter(initialCat);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(FEATURED_PRODUCTS);
    } else {
      setFilteredProducts(
        FEATURED_PRODUCTS.filter(product => product.category === category)
      );
    }
  };

  return (
    <div className="products-container">
      <section className="products-header">
        <h1> What do you want to buy.....</h1>
        <p>Browse our complete collection of {FEATURED_PRODUCTS.length} products</p>
      </section>
      <section className="products-filter">
        <div className="filter-container">
          <h3>Filter by Category</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="products-count">
          Showing {filteredProducts.length} products
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-body">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try selecting a different category</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;