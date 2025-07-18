import React, { useState } from 'react';
import axios from 'axios';

export default function AddSupplier() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    orders: [{ product: '', amount: '' }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...formData.orders];
    updatedOrders[index][field] = value;
    setFormData({ ...formData, orders: updatedOrders });
  };

  const addOrderField = () => {
    setFormData({
      ...formData,
      orders: [...formData.orders, { product: '', amount: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sairambackend.onrender.com/api/suppliers', formData);
      alert('Supplier added successfully!');
      setFormData({
        name: '',
        mobile: '',
        address: '',
        orders: [{ product: '', amount: '' }],
      });
    } catch (error) {
      console.error('Error adding supplier:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Supplier</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Supplier Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Orders (Product & Amount)</label>
          {formData.orders.map((order, index) => (
            <div className="row mb-2" key={index}>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Product ${index + 1}`}
                  value={order.product}
                  onChange={(e) =>
                    handleOrderChange(index, 'product', e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={order.amount}
                  onChange={(e) =>
                    handleOrderChange(index, 'amount', e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addOrderField}
          >
            + Add Another Order
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Supplier
        </button>
      </form>
    </div>
  );
}
