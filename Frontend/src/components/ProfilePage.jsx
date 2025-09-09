import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from './Navbar.jsx';
import ProductUploadForm from './ProductUploadForm.jsx';

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="container p-8 mx-auto">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                
                <div className="p-6 mt-6 bg-gray-100 border rounded-lg">
                    <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                    <p className="mt-2 text-lg"><strong>Email:</strong> {user.email}</p>
                    <p className="mt-2 text-lg">
                        <strong>Role:</strong> 
                        <span className={`ml-2 px-2 py-1 text-sm rounded ${user.role === 'seller' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                            {user.role}
                        </span>
                    </p>
                    {user.role === 'seller' && user.sellerDetails && (
                        <div className="mt-2">
                             <p className="text-lg"><strong>Store Name:</strong> {user.sellerDetails.storeName}</p>
                             <p className="text-lg"><strong>Phone:</strong> {user.sellerDetails.phone}</p>
                        </div>
                    )}
                </div>

                {user.role === 'seller' ? (
                    <ProductUploadForm />
                ) : (
                    <div className="p-6 mt-6 text-center bg-white border rounded-lg">
                        <h2 className="text-xl font-bold">Want to sell your creations?</h2>
                        <p className="mt-2">Complete your profile to become a seller and start listing your products.</p>
                        <Link to="/sell" className="inline-block px-6 py-2 mt-4 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Become a Seller
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;