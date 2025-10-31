import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaStar, 
  FaShoppingCart, 
  FaPhone, 
  FaHeart,
  FaRegHeart,
  FaClock,
  FaTag,
  FaShippingFast
} from 'react-icons/fa';

const MarketCard = ({ market = {}, onToggleFavorite, isFavorite = false }) => {
  // ✅ Safely handle cases where products is missing
  const products = Array.isArray(market.products) ? market.products : [];
  const images = Array.isArray(market.images) ? market.images : [];

  return (
    <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border border-gray-200">
      {/* Market Image Gallery */}
      {images.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={images[0]} 
            alt={market.name || "Market"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Favorite Button */}
          <button 
            onClick={() => onToggleFavorite && onToggleFavorite(market.id)}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={16} />
            ) : (
              <FaRegHeart className="text-gray-600" size={16} />
            )}
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs">
              +{images.length - 1}
            </div>
          )}

          {/* Specialization Badge */}
          {market.bestFor && (
            <div className="absolute top-3 left-3">
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                {market.bestFor}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Market Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-900">
              {market.name || "Unnamed Market"}
            </h3>
            {market.category && (
              <span className="text-sm text-gray-500 mt-1 block">
                {market.category}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <FaStar className="fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {market.rating || "N/A"}
            </span>
            <span className="text-xs text-gray-400">
              ({market.reviewCount || 0})
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-2 text-green-600" size={14} />
          <span className="text-sm">
            {market.location || "Location not available"}
          </span>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FaMapMarkerAlt className="mr-1" size={12} />
            {market.distance ? `${market.distance} away` : "Distance unknown"}
          </span>
          
          <div className="flex items-center text-gray-500 text-sm">
            <FaClock className="mr-1" size={12} />
            <span>{market.hours || "Hours not listed"}</span>
          </div>
        </div>

        {/* Delivery Info */}
        {market.delivery && (
          <div className="mt-3 flex items-center text-sm text-blue-600">
            <FaShippingFast className="mr-2" size={14} />
            <span>Delivery Available</span>
            {market.deliveryFee && (
              <span className="ml-2 text-gray-600">
                • ${market.deliveryFee}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Available */}
      <div className="p-6">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <FaShoppingCart className="mr-2 text-green-600" />
          Available Products
        </h4>

        {products.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {products.slice(0, 4).map((product, index) => (
              <span
                key={index}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200"
              >
                {product}
              </span>
            ))}
            {products.length > 4 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                +{products.length - 4} more
              </span>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No products listed</p>
        )}
      </div>

      {/* Special Offers */}
      {market.specialOffers && (
        <div className="px-6 pb-4">
          <div className="flex items-center text-sm text-red-600 mb-2">
            <FaTag className="mr-2" />
            <span className="font-medium">Special Offers</span>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm">{market.specialOffers}</p>
          </div>
        </div>
      )}

      {/* Market Status */}
      {market.status && (
        <div className="px-6 pb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            market.status === 'Open' 
              ? 'bg-green-100 text-green-800' 
              : market.status === 'Closed'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              market.status === 'Open' ? 'bg-green-500' : 
              market.status === 'Closed' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            {market.status}
            {market.status === 'Open' && market.closingSoon && (
              <span className="ml-1 text-orange-600">• Closing soon</span>
            )}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex space-x-3">
          <button className="flex-1 bg-green-600 text-white rounded-lg text-sm py-3 hover:bg-green-700 transition font-medium">
            View Details
          </button>
          <button className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-200">
            <FaPhone size={16} />
          </button>
          <button className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-200">
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;