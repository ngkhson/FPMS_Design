import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import BookPitch from './pages/BookPitch';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTimeline from './pages/admin/AdminTimeline';
import AdminBookings from './pages/admin/AdminBookings';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPitches from './pages/admin/AdminPitches';
import AdminTimeSlots from './pages/admin/AdminTimeSlots';
import AdminPricing from './pages/admin/AdminPricing';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="book-pitch" element={<BookPitch />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="checkout/:timeSlotId/:pitchId" element={<Checkout />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="timeline" element={<AdminTimeline />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="pitches" element={<AdminPitches />} />
          <Route path="timeslots" element={<AdminTimeSlots />} />
          <Route path="pricing" element={<AdminPricing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
