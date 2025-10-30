import React from 'react';
import { FaMapMarkerAlt, FaStar, FaShoppingCart, FaPhone } from 'react-icons/fa';

const MarketCard = ({ market }) => {
  return (
    <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Market Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-green-800">{market.name}</h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <FaStar className="fill-current" />
            <span className="text-sm font-medium text-gray-700">{market.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-2 text-green-600" />
          <span className="text-sm">{market.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FaMapMarkerAlt className="mr-1" size={12} />
            {market.distance} away
          </span>
          <span className="text-sm text-gray-500">{market.hours}</span>
        </div>
      </div>

      {/* Products Available */}
      <div className="p-6">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <FaShoppingCart className="mr-2 text-green-600" />
          Available Products
        </h4>
        <div className="flex flex-wrap gap-2">
          {market.products.map((product, index) => (
            <span 
              key={index}
              className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200"
            >
              {product}
            </span>
          ))}
        </div>
      </div>

      {/* Market Specialization */}
      {market.bestFor && (
        <div className="px-6 pb-4">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium">
            Best for: {market.bestFor}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex space-x-3">
          <button className="flex-1 btn-primary text-sm py-2">
            View Details
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-white transition duration-200">
            <FaPhone size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;