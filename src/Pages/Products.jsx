import React, { useState } from 'react';
import { FaSearch, FaFilter, FaSort, FaMapMarkerAlt, FaChartLine, FaEye, FaStar } from 'react-icons/fa';
import { RiPriceTag3Line, RiCalendarLine, RiPlantLine } from 'react-icons/ri';

// Direct image URLs for clear product representation
const productImages = {
  // Grains
  maize: 'https://images.unsplash.com/photo-1613728913293-c99bb00ef39c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFpemV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
  sorghum: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop',
  wheat: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop',
  
  // Vegetables
  potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=400&fit=crop',
  tomatoes: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop',
  carrots: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=400&fit=crop',
 
  cabbage: 'https://images.unsplash.com/photo-1598301257982-0cf01499abb2?w=600&h=400&fit=crop',
  pepper: 'https://images.unsplash.com/photo-1525607551107-68e20c75b1a8?w=600&h=400&fit=crop',
  eggplant: 'https://images.unsplash.com/photo-1594282482151-1c4c9e57b89a?w=600&h=400&fit=crop',
  cucumber: 'https://images.unsplash.com/photo-1563598755141-4dcaca835934?w=600&h=400&fit=crop',
  
  // Fruits
  bananas: 'https://expoka.com/public/uploads/all/IAwcaDmFzHYCvcrsPyyk0A0UjY3mFxQFnqgx9hJa.jpg',
  avocado: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=400&fit=crop',
  pineapple: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&h=400&fit=crop',
  mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&h=400&fit=crop',
  watermelon: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=600&h=400&fit=crop',
  
  // Tubers
  cassava: 'https://www.shutterstock.com/image-photo/cassava-root-isolated-on-white-600nw-1583258662.jpg',
  sweetpotato: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
  
  // Legumes
  beans: 'https://media.gettyimages.com/id/1359081698/photo/red-beans-as-a-background.jpg?s=612x612&w=gi&k=20&c=aebLe6CdgCk6GCbLNouVKiWFW9XuTXrd-tyuiCggaq8=',
  peas: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
  lentils: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
  
  // Default fallback
  default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop'
};

// Real product image function with direct URLs
const getProductImage = (product, size = 'medium') => {
  const sizes = {
    small: '150x100',
    medium: '400x300',
    large: '600x400'
  };
  
  const productKey = product.name.toLowerCase().replace(/\s+/g, '');
  const imageUrl = productImages[productKey] || productImages.default;
  
  // For Unsplash images, we can use the same URL as they handle sizing via URL parameters
  return imageUrl;
};

// Sample market data
const markets = [
  { name: 'Kimironko Market', distance: '2.5 km', products: 45 },
  { name: 'Nyabugogo Market', distance: '3.2 km', products: 38 },
  { name: 'Gikondo Market', distance: '1.8 km', products: 52 },
  { name: 'Kicukiro Market', distance: '4.1 km', products: 29 }
];

const Products = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const categories = [
    { value: 'all', label: 'All Categories', count: products.length },
    { value: 'grains', label: 'Grains', count: products.filter(p => p.category === 'grains').length },
    { value: 'vegetables', label: 'Vegetables', count: products.filter(p => p.category === 'vegetables').length },
    { value: 'fruits', label: 'Fruits', count: products.filter(p => p.category === 'fruits').length },
    { value: 'tubers', label: 'Tubers', count: products.filter(p => p.category === 'tubers').length },
    { value: 'legumes', label: 'Legumes', count: products.filter(p => p.category === 'legumes').length }
  ];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      parseFloat(product.price) >= priceRange[0] &&
      parseFloat(product.price) <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high': return parseFloat(b.price) - parseFloat(a.price);
        case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
        case 'name': return a.name.localeCompare(b.name);
        case 'trend': return a.trend === 'up' ? -1 : a.trend === 'down' ? 1 : 0;
        case 'popular': return (b.views || 0) - (a.views || 0);
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

  // Product Image Component with clear, understandable images
  const ProductImage = ({ product, size = 'medium', className = '' }) => {
    const sizeClasses = {
      small: 'w-16 h-16',
      medium: 'w-24 h-24',
      large: 'w-full h-56'
    };

    return (
      <div className={`${sizeClasses[size]} ${className} rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-inner`}>
        <img
          src={getProductImage(product, size)}
          alt={`Fresh ${product.name} - High Quality Agricultural Product`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = productImages.default;
          }}
        />
      </div>
    );
  };

  // Product Card Component with clear product representation
  const ProductCard = ({ product, viewMode = 'grid' }) => {
    if (viewMode === 'list') {
      return (
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:border-green-300 group">
          <div className="flex items-start space-x-6">
            {/* Clear Product Image */}
            <div className="flex-shrink-0">
              <ProductImage product={product} size="medium" className="shadow-md group-hover:shadow-lg transition-shadow duration-300" />
            </div>
            
            {/* Product Information */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Product Name with Clear Typography */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                        {product.category}
                      </span>
                      {product.rating && (
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-gray-500">({product.reviews || 0})</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price and Trend Information */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-green-600">{product.price}</span>
                      <span className="text-gray-500 text-lg">RWF/{product.unit}</span>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      product.trend === 'up' ? 'bg-green-100 text-green-700' : 
                      product.trend === 'down' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.trend === 'up' ? '↗' : product.trend === 'down' ? '↘' : '→'} {product.change}
                    </span>
                  </div>

                  {/* Additional Product Details */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-green-500" />
                      <span>{product.market || 'Multiple Markets'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RiCalendarLine className="w-4 h-4 text-green-500" />
                      <span>{product.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEye className="w-4 h-4 text-gray-400" />
                      <span>{product.views || 0} views</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="flex-shrink-0">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                View Details
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Grid View with Clear Product Image
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-green-300 group">
        {/* Product Image Section */}
        <div className="relative h-56 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
          <ProductImage product={product} size="large" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 capitalize shadow-sm">
              {product.category}
            </span>
          </div>
          
          {/* Trend Indicator */}
          <div className="absolute top-4 right-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
              product.trend === 'up' ? 'bg-green-500 text-white' : 
              product.trend === 'down' ? 'bg-red-500 text-white' : 
              'bg-gray-500 text-white'
            }`}>
              <span className="text-lg font-bold">
                {product.trend === 'up' ? '↗' : product.trend === 'down' ? '↘' : '→'}
              </span>
            </div>
          </div>

          {/* Rating Badge */}
          {product.rating && (
            <div className="absolute bottom-4 left-4">
              <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold flex items-center space-x-1">
                <FaStar className="w-3 h-3 text-yellow-400" />
                <span>{product.rating}</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="p-6">
          {/* Product Name */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-2 line-clamp-2">
              {product.name}
            </h3>
          </div>

          {/* Price and Trend */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-green-600">{product.price}</span>
              <span className="text-gray-500">RWF/{product.unit}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.trend === 'up' ? 'bg-green-100 text-green-700' : 
              product.trend === 'down' ? 'bg-red-100 text-red-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {product.change}
            </span>
          </div>

          {/* Additional Details */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{product.market || 'Multiple'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <RiCalendarLine className="w-4 h-4" />
              <span>{product.lastUpdated}</span>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FaEye className="w-4 h-4" />
              <span>{product.views || 0} views</span>
            </div>
            <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Price Card with Small Product Images
  const PriceCard = ({ priceData }) => (
    <div className="bg-white rounded-xl p-4 border border-green-100 hover:border-green-300 transition-all duration-200 group hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <ProductImage product={priceData} size="small" className="shadow-sm" />
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h4 className="font-bold text-gray-900 text-base">{priceData.product}</h4>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <FaMapMarkerAlt className="w-3 h-3 text-gray-400" />
            <span className="text-gray-600 text-sm">{priceData.market}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-green-600">{priceData.price}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                priceData.trend === 'up' ? 'bg-green-100 text-green-700' : 
                priceData.trend === 'down' ? 'bg-red-100 text-red-700' : 
                'bg-gray-100 text-gray-700'
              }`}>
                {priceData.change}
              </span>
              <span className="text-xs text-gray-500">{priceData.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Market Card Component
  const MarketCard = ({ market }) => (
    <div className="bg-white rounded-xl p-4 border border-green-100 hover:border-green-300 transition-all duration-200 group hover:shadow-md">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
          <FaMapMarkerAlt className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">{market.name}</h4>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>{market.distance} away</span>
            <span>{market.products} products</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg flex items-center justify-center">
                  <RiPriceTag3Line className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                    Market Products
                  </h1>
                  <p className="text-gray-600">Clear product images with detailed market information</p>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{products.length}</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{markets.length}</div>
                <div className="text-xs text-gray-500">Markets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs text-gray-500">Live Updates</div>
              </div>
            </div>
          </div>

          {/* Quick Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-green-500 text-white border-green-500 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                }`}
              >
                <span className="text-sm font-medium">{category.label}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, markets, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="trend">Sort by Trend</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Products
                  {searchTerm && <span className="text-green-600"> for "{searchTerm}"</span>}
                </h2>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-green-100">
                  <FaEye className="w-4 h-4" />
                  <span>1.2K views today</span>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-green-100">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <RiPlantLine className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-3">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any products matching your search criteria.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 2000]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-8">
              {/* Live Prices */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <FaChartLine className="mr-2 text-green-600" />
                    Live Prices
                  </h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Live
                  </span>
                </div>
                
                <div className="space-y-4">
                  {filteredProducts.slice(0, 4).map((product, index) => (
                    <PriceCard key={index} priceData={product} />
                  ))}
                </div>
              </div>

              {/* Nearby Markets */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
                  <FaMapMarkerAlt className="mr-2 text-green-600" />
                  Nearby Markets
                </h3>
                
                <div className="space-y-3">
                  {markets.map((market, index) => (
                    <MarketCard key={index} market={market} />
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                <h4 className="font-semibold mb-4 flex items-center">
                  <RiCalendarLine className="mr-2" />
                  Today's Stats
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Products Tracked</span>
                    <span className="font-semibold">{products.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Price Updates</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Active Markets</span>
                    <span className="font-semibold">{markets.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100">Farmers Online</span>
                    <span className="font-semibold">247</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;