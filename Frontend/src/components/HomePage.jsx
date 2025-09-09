import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import ProductCard from './ProductCard.jsx';
import Spinner from './Spinner.jsx';

const categories = ['All', 'Paintings', 'Artifacts', 'Clothes', 'Portraits'];

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Could not fetch products from the server.');
                }
                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch products. Please ensure the backend server is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <header className="py-12 text-center text-white bg-indigo-600">
                <h1 className="text-4xl font-extrabold">Welcome to Artisan Alley</h1>
                <p className="mt-2 text-lg">Your marketplace for unique, handmade creations.</p>
            </header>
            <main className="container py-12 mx-auto">
                <div className="flex justify-center mb-8 space-x-2">
                    {categories.map(category => (
                        <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                            {category}
                        </button>
                    ))}
                </div>

                {error && <p className="text-center text-red-500">{error}</p>}

                {loading ? (
                    <div className="flex justify-center"><Spinner /></div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                           <div className="col-span-full text-center text-gray-500 py-10">
                             <h3 className="text-xl font-semibold">No Products Yet</h3>
                             <p className="mt-2">It looks like no products have been listed. Why not be the first?</p>
                           </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default HomePage;