// src/components/OrderForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderForm() {
  const [veggies, setVeggies] = useState([]);
  const [form, setForm] = useState({
    name: '', phone: '', address: '', items: []
  });

  useEffect(() => {
    axios.get('https://sairambackend.onrender.com/api/vegetables')
      .then(res => setVeggies(res.data));
  }, []);

  const handleQtyChange = (vegId, qty) => {
    const updatedItems = form.items.filter(i => i.vegetableId !== vegId);
    if (qty > 0) updatedItems.push({ vegetableId: vegId, quantityKg: qty });
    setForm({ ...form, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://sairambackend.onrender.com/api/orders', {
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address
      },
      items: form.items
    })
      .then(() => alert('Order placed!'))
      .catch(err => alert('Error placing order'));
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="form-control mb-2" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} required />
        <textarea className="form-control mb-2" placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} required />

        <h5>Select Vegetables:</h5>
        {veggies.map(v => (
          <div key={v._id} className="mb-2">
            <label>{v.name} - ₹{v.pricePerKg}/kg</label>
            <input
              type="number"
              className="form-control"
              placeholder="Qty in Kg"
              onChange={e => handleQtyChange(v._id, Number(e.target.value))}
              min="0"
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary mt-3">Submit Order</button>
      </form>
    </div>
  );
}
