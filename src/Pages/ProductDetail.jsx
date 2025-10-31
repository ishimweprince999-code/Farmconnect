import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  HiArrowLeft, 
  HiShoppingCart, 
  HiMap, 
  HiCalendar,
  HiTrendingUp,
  HiTrendingDown,
  HiMinus,
  HiShare,
  HiBookmark,
  HiChartBar,
  HiShoppingBag
} from 'react-icons/hi';
import { 
  RiPlantLine, 
  RiPriceTag3Line, 
  RiStarFill, 
  RiStarHalfFill,
  RiMapPinLine,
  RiTimeLine
} from 'react-icons/ri';

const ProductDetail = ({ products, markets }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link 
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get markets that sell this product
  const availableMarkets = markets.filter(market => 
    product.markets.includes(market.id)
  );

  // Sample price history data
  const priceHistory = [
    { date: '2024-01-15', price: 420, trend: 'up' },
    { date: '2024-01-14', price: 410, trend: 'up' },
    { date: '2024-01-13', price: 430, trend: 'down' },
    { date: '2024-01-12', price: 440, trend: 'down' },
    { date: '2024-01-11', price: 450, trend: 'down' },
    { date: '2024-01-10', price: 460, trend: 'down' },
    { date: '2024-01-09', price: 470, trend: 'down' },
  ];

  // Sample similar products
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <HiTrendingUp className="text-green-500" />;
      case 'down':
        return <HiTrendingDown className="text-red-500" />;
      default:
        return <HiMinus className="text-gray-500" />;
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<RiStarFill key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<RiStarHalfFill key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<RiStarFill key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <HiArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'text-yellow-500 bg-yellow-50' 
                    : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                }`}
              >
                <HiBookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <HiShare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Product Info */}
          <div className="lg:col-span-2">
            {/* Product Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-64 h-64 object-cover rounded-2xl shadow-md"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-2">
                        <RiPlantLine className="mr-1" />
                        {product.category}
                      </span>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                      <p className="text-gray-600 text-lg">{product.description}</p>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-3 mb-2">
                      <span className="text-4xl font-bold text-green-700">{product.price}</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTrendColor(product.trend)}`}>
                        {getTrendIcon(product.trend)}
                        <span className="ml-1">{product.change}</span>
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">Last updated: {product.lastUpdated}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <HiShoppingBag className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-lg font-semibold text-gray-900">{product.marketCount}</div>
                      <div className="text-sm text-gray-500">Markets</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <RiTimeLine className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-lg font-semibold text-gray-900">{product.lastUpdated}</div>
                      <div className="text-sm text-gray-500">Updated</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <HiTrendingUp className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-lg font-semibold text-gray-900">15%</div>
                      <div className="text-sm text-gray-500">This Month</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <RiPriceTag3Line className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-lg font-semibold text-gray-900">High</div>
                      <div className="text-sm text-gray-500">Demand</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <HiMap className="w-5 h-5" />
                      <span>Find in Markets</span>
                    </button>
                    <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <HiChartBar className="w-5 h-5" />
                      <span>Price Alert</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg">
              {/* Tab Headers */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'markets', 'history', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab === 'overview' && 'Product Overview'}
                      {tab === 'markets' && `Available Markets (${availableMarkets.length})`}
                      {tab === 'history' && 'Price History'}
                      {tab === 'reviews' && 'Reviews & Ratings'}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description} This product is currently in high demand across local markets. 
                        The quality is excellent and it's sourced directly from local farmers who practice 
                        sustainable agriculture methods.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Fresh from local farms
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            High nutritional value
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Sustainable farming practices
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Competitive market pricing
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Storage Tips</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Store in cool, dry place
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Keep away from direct sunlight
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Use within 2 weeks for best quality
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'markets' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Available in {availableMarkets.length} Markets
                    </h3>
                    {availableMarkets.map(market => (
                      <div
                        key={market.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{market.name}</h4>
                            <p className="text-gray-600 text-sm flex items-center mt-1">
                              <RiMapPinLine className="mr-1" />
                              {market.location}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="flex items-center text-sm text-gray-500">
                                <HiCalendar className="mr-1" />
                                {market.hours}
                              </span>
                              <span className="flex items-center text-sm text-gray-500">
                                <div className="flex items-center mr-1">
                                  {renderStars(market.rating)}
                                </div>
                                {market.rating}
                              </span>
                              <span className="text-sm text-green-600 font-medium">
                                {market.distance}
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/markets/${market.id}`}
                            className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Price History (Last 7 Days)</h3>
                    <div className="space-y-3">
                      {priceHistory.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <HiCalendar className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-700">
                              {new Date(day.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-900">{day.price} RWF/kg</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                              day.trend === 'up' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {getTrendIcon(day.trend)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                    <div className="text-center py-8 text-gray-500">
                      <HiShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Similar Products */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h3>
              <div className="space-y-4">
                {similarProducts.map(similarProduct => (
                  <Link
                    key={similarProduct.id}
                    to={`/products/${similarProduct.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <img
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                        {similarProduct.name}
                      </h4>
                      <p className="text-sm text-gray-500">{similarProduct.price}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      similarProduct.trend === 'up' 
                        ? 'bg-green-100 text-green-800' 
                        : similarProduct.trend === 'down'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {similarProduct.change}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                  <HiChartBar className="w-5 h-5 text-green-600" />
                  <span>Set Price Alert</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                  <HiMap className="w-5 h-5 text-green-600" />
                  <span>Compare Markets</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                  <HiShoppingCart className="w-5 h-5 text-green-600" />
                  <span>Add to Watchlist</span>
                </button>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Market Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Current Demand</span>
                  <span className="font-semibold text-green-900">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Price Stability</span>
                  <span className="font-semibold text-green-900">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Best Buying Time</span>
                  <span className="font-semibold text-green-900">Morning</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Seasonal Trend</span>
                  <span className="font-semibold text-green-900">Stable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;