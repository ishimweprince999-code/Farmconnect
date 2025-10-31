import React, { useState } from 'react';
import { 
  FaChartLine, FaFilter, FaDownload, FaShare, FaBell, 
  FaArrowUp, FaArrowDown, FaMinus, FaCalendar,
  FaMapMarkerAlt, FaShoppingBag, FaEye, FaStar
} from 'react-icons/fa';
import { RiPriceTag3Line, RiLineChartLine, RiBarChartFill } from 'react-icons/ri';

// Sample price data for different products
const priceData = {
  tomatoes: [
    { date: 'Jan', price: 750, market: 'Kimironko' },
    { date: 'Feb', price: 800, market: 'Kimironko' },
    { date: 'Mar', price: 850, market: 'Kimironko' },
    { date: 'Apr', price: 780, market: 'Kimironko' },
    { date: 'May', price: 820, market: 'Kimironko' },
    { date: 'Jun', price: 900, market: 'Kimironko' },
  ],
  potatoes: [
    { date: 'Jan', price: 550, market: 'Nyabugogo' },
    { date: 'Feb', price: 600, market: 'Nyabugogo' },
    { date: 'Mar', price: 580, market: 'Nyabugogo' },
    { date: 'Apr', price: 620, market: 'Nyabugogo' },
    { date: 'May', price: 590, market: 'Nyabugogo' },
    { date: 'Jun', price: 610, market: 'Nyabugogo' },
  ],
  maize: [
    { date: 'Jan', price: 400, market: 'Gikondo' },
    { date: 'Feb', price: 420, market: 'Gikondo' },
    { date: 'Mar', price: 450, market: 'Gikondo' },
    { date: 'Apr', price: 430, market: 'Gikondo' },
    { date: 'May', price: 460, market: 'Gikondo' },
    { date: 'Jun', price: 480, market: 'Gikondo' },
  ]
};

const products = [
  { id: 'tomatoes', name: 'Tomatoes', category: 'vegetables', currentPrice: 900, change: '+8.2%', trend: 'up' },
  { id: 'potatoes', name: 'Potatoes', category: 'tubers', currentPrice: 610, change: '+3.4%', trend: 'up' },
  { id: 'maize', name: 'Maize', category: 'grains', currentPrice: 480, change: '+4.3%', trend: 'up' },
  { id: 'beans', name: 'Beans', category: 'legumes', currentPrice: 1200, change: '-2.1%', trend: 'down' },
  { id: 'bananas', name: 'Bananas', category: 'fruits', currentPrice: 700, change: '+5.6%', trend: 'up' },
  { id: 'onions', name: 'Onions', category: 'vegetables', currentPrice: 850, change: '-1.2%', trend: 'down' },
];

const markets = [
  { id: 'kimironko', name: 'Kimironko Market', products: 45, distance: '2.5km' },
  { id: 'nyabugogo', name: 'Nyabugogo Market', products: 38, distance: '3.2km' },
  { id: 'gikondo', name: 'Gikondo Market', products: 52, distance: '1.8km' },
  { id: 'kicukiro', name: 'Kicukiro Market', products: 29, distance: '4.1km' },
];

const PriceTrends = () => {
  const [selectedProduct, setSelectedProduct] = useState('tomatoes');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [timeRange, setTimeRange] = useState('6m');
  const [chartType, setChartType] = useState('line');
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

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
        return 'text-green-700 bg-green-100 border-green-200';
      case 'down':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  // Mock chart data - in real app, this would come from an API
  const generateChartData = () => {
    return priceData[selectedProduct] || [];
  };

  const chartData = generateChartData();

  // Calculate statistics
  const calculateStats = () => {
    const prices = chartData.map(item => item.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const currentPrice = prices[prices.length - 1];
    const change = ((currentPrice - prices[0]) / prices[0]) * 100;

    return {
      maxPrice,
      minPrice,
      avgPrice,
      currentPrice,
      change: change.toFixed(1)
    };
  };

  const stats = calculateStats();

  // Simple chart rendering (in real app, use a charting library like Chart.js)
  const renderChart = () => {
    const maxPrice = Math.max(...chartData.map(d => d.price));
    const minPrice = Math.min(...chartData.map(d => d.price));
    const range = maxPrice - minPrice;

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Price Trend Analysis</h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-colors duration-200">
              <FaDownload className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-colors duration-200">
              <FaShare className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Simple Bar Chart Visualization */}
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between space-x-2 px-4">
            {chartData.map((data, index) => {
              const height = ((data.price - minPrice) / range) * 100;
              return (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 hover:from-green-600 hover:to-green-500"
                    style={{ height: `${height}%` }}
                  >
                    <div className="text-white text-xs font-medium text-center mt-1">
                      {data.price}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{data.date}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Price (RWF/kg)</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Market: {chartData[0]?.market || 'Multiple'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg flex items-center justify-center">
                <RiLineChartLine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  Price Trends
                </h1>
                <p className="text-gray-600">Track and analyze agricultural price movements</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-gray-500">Markets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-xs text-gray-500">Updates</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.currentPrice}</div>
              <div className="text-sm text-gray-500">Current Price</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.avgPrice.toFixed(0)}</div>
              <div className="text-sm text-gray-500">Average Price</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.maxPrice}</div>
              <div className="text-sm text-gray-500">Highest Price</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-4 text-center">
              <div className={`text-2xl font-bold ${stats.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.change}%
              </div>
              <div className="text-sm text-gray-500">Price Change</div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Product Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Market Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Market</label>
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Markets</option>
                {markets.map(market => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="1y">1 Year</option>
              </select>
            </div>

            {/* Chart Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>

            {/* Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Chart Section */}
          <div className="lg:col-span-3">
            {renderChart()}

            {/* Price Alerts Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Price Alerts</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200">
                  <FaBell className="w-4 h-4" />
                  <span>Set Alert</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                        <RiPriceTag3Line className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">Current: {product.currentPrice} RWF/kg</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getTrendColor(product.trend)}`}>
                        {getTrendIcon(product.trend)}
                        <span>{product.change}</span>
                      </span>
                      <button className="text-gray-400 hover:text-green-600 transition-colors duration-200">
                        <FaBell className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              {/* Top Performers */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                  <FaChartLine className="mr-2 text-green-600" />
                  Top Performers
                </h3>
                
                <div className="space-y-3">
                  {products.filter(p => p.trend === 'up').slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 border border-green-100 rounded-xl bg-green-50">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                        <p className="text-green-600 text-xs">{product.change}</p>
                      </div>
                      <div className="text-lg font-bold text-green-600">{product.currentPrice}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Comparison */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                  <FaMapMarkerAlt className="mr-2 text-green-600" />
                  Market Comparison
                </h3>
                
                <div className="space-y-3">
                  {markets.map(market => (
                    <div key={market.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-green-300 transition-colors duration-200">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{market.name}</h4>
                        <p className="text-gray-500 text-xs">{market.distance} • {market.products} products</p>
                      </div>
                      <div className="text-green-600 text-sm font-medium">View</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                <h4 className="font-semibold mb-4 flex items-center">
                  <RiBarChartFill className="mr-2" />
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <button className="w-full text-left px-3 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-200 text-sm">
                    Compare Products
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-200 text-sm">
                    Download Report
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-200 text-sm">
                    Set Price Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTrends;