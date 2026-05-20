// 

import React, { useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { FEATURED_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/SearchResults.css';

const SearchResults = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setSearchTerm } = useSearch();
  const query = (searchParams.get('q') || '').trim();

  useEffect(() => {
    setSearchTerm(query);
  }, [query, setSearchTerm]);

  useEffect(() => {
    if (!query) {
      navigate('/home', { replace: true });
    }
  }, [query, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query]);

  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized) return [];

    return FEATURED_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
    );
  }, [query]);

  if (!query) {
    return null;
  }

  const hasResults = results.length > 0;

  return (
    <div className="search-results-page" key={query}>
      <section className="search-results-hero search-animate-fade-down">
        <div className="search-results-hero-inner">
          <h1>Search Results</h1>
          <p className="search-results-query">
            Showing results for <strong>&quot;{query}&quot;</strong>
          </p>
          <p className="search-results-count">
            {hasResults
              ? `${results.length} product${results.length === 1 ? '' : 's'} found`
              : 'No matching products'}
          </p>
        </div>
      </section>

      <section className="search-results-body">
        {hasResults ? (
          <div className="search-results-grid">
            {results.map((product, index) => (
              <div
                key={product.id}
                className="search-results-card-wrap"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="search-results-empty search-animate-scale-in">
            <div className="search-empty-icon" aria-hidden="true">
              <span>🔍</span>
            </div>
            <h2>Product Not Available</h2>
            <p>
              Sorry, we couldn&apos;t find any products matching{' '}
              <strong>&quot;{query}&quot;</strong>.
            </p>
            <p className="search-empty-hint">
              Try different keywords, check spelling, or browse our categories.
            </p>
            <Link to="/home" className="search-empty-btn">
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;