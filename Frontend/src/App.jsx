// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductDetailsPage from './components/ProductDetailsPage.jsx';
import SellerApplicationPage from './components/SellerApplicationPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />

        <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
        <Route path="/sell" element={ <ProtectedRoute> <SellerApplicationPage /> </ProtectedRoute> } />
      </Routes>
    </Router>
  );
}

export default App;