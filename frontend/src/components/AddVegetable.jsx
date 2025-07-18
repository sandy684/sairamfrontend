import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddVegetable() {
  const [form, setForm] = useState({
    name: '',
    pricePerKg: '',
    availableKg: '',
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('pricePerKg', form.pricePerKg);
    formData.append('availableKg', form.availableKg);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('https://sairambackend.onrender.com/api/vegetables', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Vegetable added!');
      setForm({ name: '', pricePerKg: '', availableKg: '' });
      setImage(null);
    } catch (err) {
      alert('❌ Error adding vegetable: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">➕ Add New Vegetable</h2>
      <form onSubmit={handleSubmit} className="card card-body shadow-sm">
        <input
          className="form-control mb-3"
          placeholder="Vegetable Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Price per Kg"
          value={form.pricePerKg}
          onChange={(e) => setForm({ ...form, pricePerKg: e.target.value })}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Available Kg"
          value={form.availableKg}
          onChange={(e) => setForm({ ...form, availableKg: e.target.value })}
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button className="btn btn-success" type="submit">Save Vegetable</button>
      </form>
    </div>
  );
}
