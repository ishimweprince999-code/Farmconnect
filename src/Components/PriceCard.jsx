import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus, FaHistory } from 'react-icons/fa';

const PriceCard = ({ priceData }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <FaArrowUp className="text-green-600" size={12} />;
      case 'down':
        return <FaArrowDown className="text-red-600" size={12} />;
      default:
        return <FaMinus className="text-gray-600" size={12} />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-300 transition-colors duration-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{priceData.product}</h4>
          <p className="text-sm text-gray-600">{priceData.market}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getTrendColor(priceData.trend)}`}>
          {getTrendIcon(priceData.trend)}
          <span className="font-medium">{priceData.change}</span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold text-green-700">{priceData.price}</p>
          <p className="text-xs text-gray-500">per {priceData.unit}</p>
        </div>
        
        <div className="flex items-center text-gray-500 text-xs">
          <FaHistory className="mr-1" size={10} />
          <span>{priceData.lastUpdated}</span>
        </div>
      </div>

      {priceData.volume && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Volume:</span>
            <span className="font-medium">{priceData.volume}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCard;