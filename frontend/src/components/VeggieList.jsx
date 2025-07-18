import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './VeggieList.css';

export default function VeggieList() {
  const [veggies, setVeggies] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get('https://sairambackend.onrender.com/api/vegetables')
      .then((res) => setVeggies(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="veggie-page">
      <div className="veggie-header">
        <h1>Fresh & Organic Veggies 🧺</h1>
        <p>Hand-picked vegetables from local farms, delivered fresh every day.</p>
      </div>

      <div className="veggie-grid">
        {veggies.map((veg) => (
          <div className="veggie-card" key={veg._id}>
          <div className="card h-100 shadow-sm text-center p-3">
             <img
  src={veg.image || 'https://dummyimage.com/200x150/cccccc/000000&text=Veggie'}
  alt={veg.name}
  className="img-fluid rounded mb-3"
  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
/>

            </div>

            <div className="veggie-info">
              <h3 className="veggie-name">{veg.name}</h3>
              <span className="veggie-tag">Category: {veg.category || "General"}</span>

              <div className="veggie-details">
                <div className="price-section">
                  <p className="label">Price:</p>
                  <p className="value">₹{veg.pricePerKg} / Kg</p>
                </div>

                <div className="stock-section">
                  <p className="label">Stock:</p>
                  <p className="value">{veg.availableKg} Kg</p>
                </div>
              </div>

              <button className="add-btn" onClick={() => addToCart(veg)}>
                ➕ Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-cart-link">
        <Link to="/cart" className="go-to-cart">
          🛒 Go to Cart
        </Link>
      </div>
    </div>
  );
}
