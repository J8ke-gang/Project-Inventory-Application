import { useEffect, useState } from "react";
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
} from "../api/api";
import "../styles/cartPage.css";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // refresh cart
  const refreshCart = async () => {
    try {
      const data = await getCartItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refreshCart();
      setLoading(false);
    })();
  }, []);
  // add multiple quantity in cart
  const handleIncrease = async (item) => {
    await updateCartItemQuantity(item.id, item.quantity + 1);
    await refreshCart();
  };
  // decrease quantity in cart
  const handleDecrease = async (item) => {
    if (item.quantity === 1) {
      await removeCartItem(item.id);
    } else {
      await updateCartItemQuantity(item.id, item.quantity - 1);
    }
    await refreshCart();
  };
  //remove from cart
  const handleRemove = async (item) => {
    await removeCartItem(item.id);
    await refreshCart();
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div className="item-info">
              <strong>{item.name}</strong>
              <span className="item-price">
                ${Number(item.price).toFixed(2)}
              </span>
            </div>
            <div className="item-quantity">
              <button className="btn" onClick={() => handleDecrease(item)}>
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button className="btn" onClick={() => handleIncrease(item)}>
                +
              </button>
            </div>
            <button
              className="btn remove-btn"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </p>
    </div>
  );
}
