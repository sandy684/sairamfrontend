import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManageVegetables() {
  const [veggies, setVeggies] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/admin');
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    try {
      const res = await axios.get('https://sairambackend.onrender.com/api/vegetables');
      setVeggies(res.data);
    } catch (err) {
      alert('Error fetching vegetables');
    }
  };

  const deleteVeggie = async (id) => {
    try {
      await axios.delete(`https://sairambackend.onrender.com/api/vegetables/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVegetables();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const updateVeggie = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://sairambackend.onrender.com/api/vegetables/${editForm._id}`,
        {
          name: editForm.name,
          pricePerKg: editForm.pricePerKg,
          availableKg: editForm.availableKg,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditForm(null);
      fetchVegetables();
    } catch (err) {
      alert('Failed to update');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center text-md-start">🥕 Manage Vegetables</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price/Kg</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {veggies.map((v) => (
              <tr key={v._id}>
                <td>{v.name}</td>
                <td>₹{v.pricePerKg}</td>
                <td>{v.availableKg} kg</td>
                <td>
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditForm(v)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteVeggie(v._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editForm && (
        <form onSubmit={updateVeggie} className="card card-body mt-4">
          <h5 className="mb-3">✏️ Edit Vegetable</h5>

          <div className="mb-2">
            <label>Name</label>
            <input
              className="form-control"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-2">
            <label>Price per Kg</label>
            <input
              type="number"
              className="form-control"
              value={editForm.pricePerKg}
              onChange={(e) => setEditForm({ ...editForm, pricePerKg: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label>Available Kg</label>
            <input
              type="number"
              className="form-control"
              value={editForm.availableKg}
              onChange={(e) => setEditForm({ ...editForm, availableKg: e.target.value })}
              required
            />
          </div>

          <div className="d-flex flex-column flex-md-row gap-2">
            <button type="submit" className="btn btn-success w-100 w-md-auto">✅ Update</button>
            <button type="button" className="btn btn-secondary w-100 w-md-auto" onClick={() => setEditForm(null)}>
              ❌ Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
