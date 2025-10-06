import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (name) => {
    dispatch(removeItem(name));
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseInt(item.cost.replace('$', ''));
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: ${totalAmount}</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '20px' }}>
          Your cart is empty 🛒
        </p>
      ) : (
        cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: {item.cost}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item)}>+</button>
              </div>

              <p>Total: ${item.quantity * parseInt(item.cost.replace('$', ''))}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(item.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartItem;
