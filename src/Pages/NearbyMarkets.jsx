import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaFilter, FaDirections, FaPhone, FaStar, FaShoppingCart } from 'react-icons/fa';
import MarketCard from '../Components/MarketCard';

const NearbyMarkets = ({ markets, onPageChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const districts = ['all', 'Gasabo', 'Nyarugenge', 'Kicukiro', 'Musanze', 'Rubavu'];

  const filteredMarkets = markets
    .filter(market => 
      market.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDistrict === 'all' || market.district === selectedDistrict)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Enhanced market data with more details
  const enhancedMarkets = [
    {
      id: 1,
      name: 'Kimironko Market',
      location: 'Gasabo District, Kigali',
      district: 'Gasabo',
      distance: '2.5 km',
      rating: 4.5,
      hours: '6:00 AM - 8:00 PM',
      products: ['Maize', 'Potatoes', 'Beans', 'Tomatoes', 'Onions', 'Cabbage'],
      bestFor: 'Vegetables & Fruits',
      contact: '+250 788 123 456',
      facilities: ['Parking', 'Storage', 'Restrooms'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 2,
      name: 'Nyabugogo Market',
      location: 'Nyarugenge District, Kigali',
      district: 'Nyarugenge',
      distance: '5.2 km',
      rating: 4.2,
      hours: '5:00 AM - 9:00 PM',
      products: ['Maize', 'Cassava', 'Beans', 'Bananas', 'Sweet Potatoes'],
      bestFor: 'Grains & Tubers',
      contact: '+250 788 234 567',
      facilities: ['Parking', 'Bank', 'Restaurants'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 3,
      name: 'Remera Market',
      location: 'Gasabo District, Kigali',
      district: 'Gasabo',
      distance: '3.8 km',
      rating: 4.3,
      hours: '6:30 AM - 7:30 PM',
      products: ['Tomatoes', 'Potatoes', 'Bananas', 'Pineapples', 'Avocados'],
      bestFor: 'Fresh Produce',
      contact: '+250 788 345 678',
      facilities: ['Parking', 'Cold Storage'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 4,
      name: 'Gikondo Market',
      location: 'Kicukiro District, Kigali',
      district: 'Kicukiro',
      distance: '4.5 km',
      rating: 4.0,
      hours: '6:00 AM - 8:00 PM',
      products: ['Beans', 'Maize', 'Vegetables', 'Fruits', 'Spices'],
      bestFor: 'Mixed Products',
      contact: '+250 788 456 789',
      facilities: ['Parking', 'Security'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 5,
      name: 'Musanze Central Market',
      location: 'Musanze District, Northern Province',
      district: 'Musanze',
      distance: '12.5 km',
      rating: 4.4,
      hours: '5:30 AM - 7:00 PM',
      products: ['Potatoes', 'Beans', 'Wheat', 'Vegetables'],
      bestFor: 'Highland Crops',
      contact: '+250 788 567 890',
      facilities: ['Parking', 'Storage', 'Bank'],
      image: '/api/placeholder/400/200'
    },
    {
      id: 6,
      name: 'Rubavu Lake Market',
      location: 'Rubavu District, Western Province',
      district: 'Rubavu',
      distance: '18.2 km',
      rating: 4.1,
      hours: '6:00 AM - 6:00 PM',
      products: ['Fish', 'Bananas', 'Beans', 'Vegetables'],
      bestFor: 'Fish & Fruits',
      contact: '+250 788 678 901',
      facilities: ['Parking', 'Cold Storage', 'Restaurants'],
      image: '/api/placeholder/400/200'
    }
  ];

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Nearby Markets</h1>
          <p className="text-gray-600">Find the best markets to sell your products</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-green-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* District Filter */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district === 'all' ? 'All Districts' : district}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="distance">Sort by Distance</option>
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-green-200">
            <div className="text-2xl font-bold text-green-700">{enhancedMarkets.length}</div>
            <div className="text-sm text-gray-600">Total Markets</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {enhancedMarkets.filter(m => parseFloat(m.distance) < 5).length}
            </div>
            <div className="text-sm text-gray-600">Within 5km</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {enhancedMarkets.filter(m => m.rating >= 4).length}
            </div>
            <div className="text-sm text-gray-600">Highly Rated</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-200">
            <div className="text-2xl font-bold text-green-700">24/7</div>
            <div className="text-sm text-gray-600">Price Updates</div>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No markets found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-green-800 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Market Locations Map
            </h2>
            <p className="text-gray-600">View all markets on an interactive map</p>
          </div>
          <div className="h-96 bg-green-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FaMapMarkerAlt size={48} className="mx-auto mb-4 text-green-400" />
              <p className="text-lg font-medium">Interactive Map View</p>
              <p className="text-sm">Market locations would be displayed here</p>
              <button className="mt-4 btn-primary">
                Open Full Map
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Can't Find Your Market?</h3>
          <p className="mb-6 text-green-100 max-w-md mx-auto">
            Help us grow our database by adding information about your local market
          </p>
          <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition duration-200">
            Suggest a Market
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyMarkets;