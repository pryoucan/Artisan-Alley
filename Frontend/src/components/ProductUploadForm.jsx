import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from './Spinner.jsx';

const ProductUploadForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('Paintings');
    const [description, setDescription] = useState('');
    const [bargainingEnabled, setBargainingEnabled] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!name || !price || !image || !category || !description) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ name, price, image, category, description, bargainingEnabled }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to upload product.');

            alert('Product uploaded successfully!');
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 mt-6 bg-white border rounded-lg">
            <h3 className="text-xl font-bold">Upload a New Product</h3>
            {error && <p className="mt-2 text-center text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded" />
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded bg-white">
                    <option>Paintings</option>
                    <option>Artifacts</option>
                    <option>Clothes</option>
                    <option>Portraits</option>
                </select>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" rows="4"></textarea>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="bargain" checked={bargainingEnabled} onChange={e => setBargainingEnabled(e.target.checked)} className="w-4 h-4" />
                    <label htmlFor="bargain">Enable Bargaining</label>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center w-full p-3 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
                    {loading ? <Spinner /> : 'Upload Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductUploadForm;