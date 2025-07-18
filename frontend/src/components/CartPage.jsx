import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './CartPage.css';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const [user, setUser] = React.useState({ name: '', phone: '', address: '' });

  const placeOrder = async () => {
    if (!user.name || !user.phone || !user.address)
      return alert('Please fill all customer details');

    try {
      await axios.post('https://sairambackend.onrender.com/api/orders', {
        customer: user,
        items: cart.map(item => ({
          vegetableId: item._id,
          quantityKg: item.quantityKg,
        })),
      });
      alert('✅ Order placed successfully!');
      clearCart();
    } catch (err) {
      alert('❌ Order failed');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.pricePerKg * item.quantityKg, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty. Start adding fresh veggies!</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-card shadow-sm">
                <img
                  src={item.image || 'https://via.placeholder.com/80?text=Veg'}
                  alt={item.name}
                  className="cart-img"
                />
                <div className="cart-details">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="price">₹{item.pricePerKg} / Kg</p>
                  <div className="quantity-row">
                    <label>Qty:</label>
                    <input
                      type="number"
                      value={item.quantityKg}
                      min={1}
                      onChange={(e) => updateQty(item._id, Number(e.target.value))}
                    />
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✖</button>
              </div>
            ))}
          </div>

          <div className="total-cost">
            <h5>Total: ₹{calculateTotal()}</h5>
          </div>

          <div className="customer-section">
            <h4 className="section-title">🧑 Customer Details</h4>
            <input
              className="form-control mb-2"
              placeholder="Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              className="form-control mb-2"
              placeholder="Phone"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Address"
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
            <button className="place-btn" onClick={placeOrder}>✅ Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}
