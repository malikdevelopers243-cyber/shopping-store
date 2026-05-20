import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ForgotPassword from './pages/ForgotPassword';
import PaymentMethod from './pages/PaymentMethod';
import PaymentSuccess from './pages/PaymentSuccess';
import { ToastProvider } from './context/ToastContext';
import Products from './pages/Products';
import './App.css';

function AppContent() {
  const { user, checkUserOnMount } = useAuth();

  useEffect(() => {
    checkUserOnMount();
  }, []);

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" replace /> : <Signup />}
        />

        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/home" replace /> : <ForgotPassword />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
<Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentMethod />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />


        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {user && <Footer />}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <ToastProvider> 
          <AppContent />
           </ToastProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;