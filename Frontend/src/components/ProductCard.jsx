// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block overflow-hidden ml-5 mr-5 bg-white border rounded-lg shadow-sm group">
      <img src={product.image} alt={product.name} className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          <span className="px-3 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">{product.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;