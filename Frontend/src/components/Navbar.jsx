// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const handleLogout = () => {
    logout();
    setDropdownOpen(false); 
    navigate('/login');
  };


  useEffect(() => {
    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <header to="/" className="text-2xl font-bold text-gray-800">
            Artisan Alley
          </header>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            
            {user ? (

              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="px-4 py-2 text-sm text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none cursor-pointer"
                >
                  Hello, {user.name}!
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 overflow-hidden bg-white border rounded-md shadow-lg z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 font-bold">Hello, {user.name}</div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/sell"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Want to Sell
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Login</Link>
                <Link to="/signup" className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">Sign Up</Link>
              </>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;