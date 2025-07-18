import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CartPage from './components/CartPage';
import VeggieList from './components/VeggieList';
import OrderForm from './components/OrderForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AddVegetable from './components/AddVegetable';
import ManageVegetables from './components/ManageVegetables';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import AddSupplier from './components/AddSupplier';
import ViewSuppliers from './components/ViewSuppliers';


function AppContent() {
  const location = useLocation();

  // Hide Navbar for admin routes
  const hideNavbarRoutes = [
    '/admin',
    '/dashboard',
    '/add-vegetable',
    '/manage-vegetables',
    '/admin/add-supplier',
    '/admin/view-suppliers'
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<VeggieList />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/admin" element={<AdminLogin />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/add-vegetable" element={<AddVegetable />} />
          <Route path="/manage-vegetables" element={<ManageVegetables />} />
          <Route path="/admin/add-supplier" element={<AddSupplier />} />
          <Route path="/admin/view-suppliers" element={<ViewSuppliers />} />
        </Route>

        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
