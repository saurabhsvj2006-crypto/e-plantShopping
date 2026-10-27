import React, { useState } from 'react';
import './App.css';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleGetStarted = () => {
    setShowProductList(true);
    setCurrentPage('plants');
  };

  const handleNavigate = (page) => {
    if (page === 'home') {
      setShowProductList(false);
      setCurrentPage('home');
    } else {
      setShowProductList(true);
      setCurrentPage(page);
    }
  };

  if (currentPage === 'cart') {
    return <CartItem onNavigate={handleNavigate} />;
  }

  if (showProductList && currentPage === 'plants') {
    return <ProductList onNavigate={handleNavigate} />;
  }

  return (
    <div className="background-image">
      <div className="landing-page">
        <h1>Welcome to Paradise Nursery</h1>
        <p>
          Discover beautiful houseplants, decorative plants,
          and succulents. Bring nature into your home and create
          a greener, happier living space.
        </p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;
