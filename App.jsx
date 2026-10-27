
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="landing-page">
        <h1>Paradise Nursery</h1>

        <p>
          Welcome to Paradise Nursery, your destination for
          beautiful houseplants. Bring nature into your home
          and create a greener, happier living space.
        </p>

        <button onClick={() => window.location.href = '#plants'}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
