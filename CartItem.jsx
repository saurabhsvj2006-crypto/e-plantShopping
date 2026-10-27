import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/CartSlice';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // updateQuantity removes the item when quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    window.alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <nav className="navbar">
        <a href="#home" onClick={(event) => {
          event.preventDefault();
          onNavigate('home');
        }}>Home</a>

        <a href="#plants" onClick={(event) => {
          event.preventDefault();
          onNavigate('plants');
        }}>Plants</a>

        <a href="#cart" onClick={(event) => {
          event.preventDefault();
          onNavigate('cart');
        }}>
          Cart 🛒 <span className="cart_quantity_count">{cartQuantity}</span>
        </a>
      </nav>

      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>
          <p>Discover beautiful plants for your home.</p>
          <button
            className="primary-button"
            onClick={() => onNavigate('plants')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <h2 className="cart-total">
            Total Cart Amount: ${totalAmount.toFixed(2)}
          </h2>

          {cartItems.map(item => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Unit Price: ${item.cost.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Item Total: ${(item.cost * item.quantity).toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>

                  <button
                    className="delete-button cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>

            <button
              className="get-started-button1"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button
              className="continue-button"
              onClick={() => onNavigate('plants')}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
