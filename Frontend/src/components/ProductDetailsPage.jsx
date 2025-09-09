// src/components/ProductDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { useAuth } from '../context/AuthContext.jsx';      // 2. Import useAuth
import Navbar from './Navbar.jsx';
import Spinner from './Spinner.jsx';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for redirecting
    const { user } = useAuth();     // Get the currently logged-in user

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bargainPrice, setBargainPrice] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Product not found.');
                }
                const data = await response.json();
                setProduct(data);
                setBargainPrice(data.price);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // --- 3. ADD THE DELETE HANDLER FUNCTION ---
    const handleDelete = async () => {
        // Always confirm a destructive action with the user
        if (window.confirm('Are you sure you want to permanently delete this product?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        // We must send the token to prove who we are and that we're authorized
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Could not delete the product.');
                }

                alert('Product deleted successfully!');
                navigate('/'); // Redirect to the homepage after deletion
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        }
    };
    // ------------------------------------------

    if (loading) return <div className="flex items-center justify-center h-screen"><Spinner /></div>;
    if (error) return ( <div> <Navbar /> <div className="py-20 text-center text-red-500"><h1 className="text-2xl font-bold">Error</h1><p>{error}</p></div> </div>);
    if (!product) return <p>Product not found.</p>;

    return (
        <div>
            <Navbar />
            <div className="container grid grid-cols-1 gap-12 p-8 mx-auto md:grid-cols-2">
                <div>
                    <img src={product.image} alt={product.name} className="object-cover w-full rounded-lg shadow-lg" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>
                    <p className="mt-2 text-lg text-gray-500">{product.category}</p>
                    <p className="mt-4 text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
                    <p className="mt-6 text-gray-700">{product.description}</p>
                    
                    <button className="w-full px-6 py-3 mt-8 text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Buy Now</button>

                    {/* --- 4. ADD THE CONDITIONAL DELETE BUTTON --- */}
                    {/* This button only renders if a user is logged in AND their ID matches the product's creator ID */}
                    {user && user._id === product.user && (
                         <button 
                            onClick={handleDelete}
                            className="w-full px-6 py-3 mt-4 text-lg text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
                        >
                            Delete Product
                        </button>
                    )}
                    {/* ------------------------------------------- */}

                    {product.bargainingEnabled && (
                        <div className="p-4 mt-6 bg-gray-100 border rounded-lg">
                            <h3 className="font-semibold">Make an Offer</h3>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-4">
                                    <button onClick={() => setBargainPrice(p => Math.max(0, p - 5))} className="px-4 py-2 font-bold text-white bg-gray-400 rounded-md hover:bg-gray-500">-</button>
                                    <span className="text-xl font-mono">${bargainPrice.toFixed(2)}</span>
                                    <button onClick={() => setBargainPrice(p => Math.min(product.price, p + 5))} className="px-4 py-2 font-bold text-white bg-gray-400 rounded-md hover:bg-gray-500">+</button>
                                </div>
                                <button onClick={() => alert('Bargain submitted!')} className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600">Submit Offer</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;