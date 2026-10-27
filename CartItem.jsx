
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <a href="#home" style={styles.link}>Home</a>
        <a href="#plants" style={styles.link}>Plants</a>
        <a href="#cart" style={styles.link}>🛒 Cart</a>
      </nav>

      <h1 style={styles.heading}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={styles.empty}>
          <h2>Your cart is empty!</h2>
          <p>Discover beautiful plants for your home.</p>
          <button
            style={styles.button}
            onClick={() => window.location.href = '#plants'}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={styles.card}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.details}>
                <h2>{item.name}</h2>
                <p>Unit Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Item Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <div style={styles.controls}>
                  <button
                    style={styles.smallButton}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    style={styles.smallButton}
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() => handleRemove(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div style={styles.summary}>
            <h2>
              Total Amount: ${totalAmount.toFixed(2)}
            </h2>

            <button
              style={styles.button}
              onClick={() => window.alert('Checkout Coming Soon!')}
            >
              Checkout
            </button>

            <button
              style={styles.continueButton}
              onClick={() => window.location.href = '#plants'}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    color: '#263b2b'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '16px',
    backgroundColor: '#245c35'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  heading: {
    textAlign: 'center',
    margin: '30px 0'
  },
  empty: {
    textAlign: 'center',
    padding: '30px'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    flexWrap: 'wrap'
  },
  image: {
    width: '140px',
    height: '140px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  details: {
    flex: 1
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  smallButton: {
    padding: '8px 14px',
    cursor: 'pointer',
    border: '1px solid #2e7d32',
    borderRadius: '5px',
    backgroundColor: 'white'
  },
  deleteButton: {
    padding: '8px 14px',
    cursor: 'pointer',
    backgroundColor: '#b3261e',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  },
  summary: {
    textAlign: 'center',
    padding: '24px'
  },
  button: {
    padding: '12px 20px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: '#2e7d32',
    color: 'white',
    border: 'none',
    borderRadius: '5px'
  },
  continueButton: {
    padding: '12px 20px',
    margin: '10px',
    cursor: 'pointer',
    backgroundColor: '#eeeeee',
    border: '1px solid #aaa',
    borderRadius: '5px'
  }
};

export default CartItem;
