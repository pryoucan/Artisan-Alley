import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from './Navbar.jsx';

const SellerApplicationPage = () => {
    const [storeName, setStoreName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!storeName || !phone) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/apply-seller', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ storeName, phone }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to apply.');
            login({ token: user.token, ...data });

            alert('Congratulations! You are now a seller.');
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen-minus-navbar bg-gray-100">
                <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Become a Seller</h2>
                    <p className="text-sm text-center text-gray-600">Complete your profile to start selling your creations.</p>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="storeName" className="text-sm font-medium text-gray-700">Store Name</label>
                            <input id="storeName" type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" placeholder="e.g., Creative Canvases" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 mt-1 border rounded-md" placeholder="e.g., +91 1234567890" />
                        </div>
                        <div>
                            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerApplicationPage;