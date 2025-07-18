import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  // Fetch Orders (with optional date filtering)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = filterDate
  ? `https://sairambackend.onrender.com/api/orders?date=${filterDate}`
  : `https://sairambackend.onrender.com/api/orders`;


      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders. Redirecting to login...');
      navigate('/admin');
    }
  };

  const markDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://sairambackend.onrender.com/api/orders/${orderId}/status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    } else {
      fetchOrders();
    }
  }, [filterDate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

return (
  <div className="container py-4">
    {/* Top Row */}
    <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
      <h2 className="fw-bold text-success">📦 Admin Dashboard</h2>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>

    {/* 📅 Date Filter */}
    <div className="mb-4">
      <label htmlFor="filterDate" className="form-label fw-semibold">Filter by Date:</label>
      <input
        type="date"
        id="filterDate"
        className="form-control"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
    </div>

    {/* Orders */}
    {orders.length === 0 ? (
      <p className="text-muted">No orders found for selected date.</p>
    ) : (
      <div className="row g-4">
        {orders.map((order) => (
          <div key={order._id} className="col-12 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title mb-1">{order.customer.name} <small className="text-muted">({order.customer.phone})</small></h5>
                <p className="mb-1"><strong>Address:</strong> {order.customer.address}</p>
                <p className="mb-1"><strong>Status:</strong> <span className={order.status === 'Pending' ? 'text-warning' : 'text-success'}>{order.status}</span></p>
                <p className="mb-2"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                
                <ul className="list-unstyled mb-3">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.vegetableId ? (
                        <span>◦ {item.vegetableId.name} – {item.quantityKg}kg</span>
                      ) : (
                        <em className="text-danger">◦ Deleted Vegetable</em>
                      )}
                    </li>
                  ))}
                </ul>

                {order.status === 'Pending' && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => markDelivered(order._id)}
                  >
                    ✅ Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
