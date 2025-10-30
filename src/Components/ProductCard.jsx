import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="text-green-600" />;
      case 'down':
        return <FaArrowDown className="text-red-600" />;
      default:
        return <FaMinus className="text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getTrendColor(product.trend)}`}>
            {getTrendIcon(product.trend)}
            <span>{product.change}</span>
          </div>
        </div>
        
        <p className="text-3xl font-bold text-green-700 mb-2">{product.price}</p>
        <p className="text-gray-600 text-sm mb-4">Per {product.unit}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Updated: {product.lastUpdated}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {product.marketCount} markets
          </span>
        </div>
      </div>
      
      <div className="bg-green-50 px-6 py-3 border-t border-green-100">
        <button className="w-full btn-secondary text-sm">
          View Market Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;