import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewSuppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('https://sairambackend.onrender.com/api/suppliers');
      setSuppliers(res.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const markAsDone = async (id) => {
    try {
      await axios.put(`https://sairambackend.onrender.com/api/suppliers/${id}/status`, {
        status: 'Done',
      });
      fetchSuppliers();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // 💰 Total for all suppliers
  const totalOverall = suppliers.reduce((total, supplier) => {
    return (
      total +
      supplier.orders.reduce(
        (sum, order) => sum + Number(order.amount || 0),
        0
      )
    );
  }, 0);

  return (
    <div className="container mt-4">
      <h3>Supplier List</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Orders</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => {
            const totalAmount = s.orders.reduce(
              (acc, order) => acc + Number(order.amount || 0),
              0
            );
            return (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.mobile}</td>
                <td>{s.address}</td>
                <td>
                  <ul>
                    {s.orders.map((order, idx) => (
                      <li key={idx}>
                        {order.product} — ₹{order.amount}
                      </li>
                    ))}
                  </ul>
                  <strong>Total: ₹{totalAmount}</strong>
                </td>
                <td>
                  <span
                    className={`badge ${
                      s.status === 'Done' ? 'bg-success' : 'bg-warning'
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td>
                  {s.status !== 'Done' && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => markAsDone(s._id)}
                    >
                      Mark as Done
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h5 className="mt-4 text-end">
        💰 <strong>Total All Suppliers: ₹{totalOverall}</strong>
      </h5>
    </div>
  );
}
