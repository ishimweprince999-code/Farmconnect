import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaSort, FaMapMarkerAlt, FaChartLine, FaEye, FaStar, FaTimes, FaArrowLeft, FaArrowRight, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { RiPriceTag3Line, RiCalendarLine, RiPlantLine } from 'react-icons/ri';

// Enhanced product images with more variety
const productImages = {
  // Grains
  maize: 'https://images.unsplash.com/photo-1613728913293-c99bb00ef39c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFpemV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
  sorghum: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop',
  wheat: 'https://images.unsplash.com/photo-1560847976-2ad1e0b6ed8c?w=600&h=400&fit=crop',
  
  // Vegetables
  potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=400&fit=crop',
  tomatoes: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop',
  carrots: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=400&fit=crop',
  onions: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=600&h=400&fit=crop',
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
  oranges: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=400&fit=crop',
  lemons: 'https://images.unsplash.com/photo-1587496679742-bad502958f4f?w=600&h=400&fit=crop',
  apples: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&h=400&fit=crop',
  
  // Tubers
  cassava: 'https://www.shutterstock.com/image-photo/cassava-root-isolated-on-white-600nw-1583258662.jpg',
  sweetpotato: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
  yam: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
  
  // Legumes
  beans: 'https://media.gettyimages.com/id/1359081698/photo/red-beans-as-a-background.jpg?s=612x612&w=gi&k=20&c=aebLe6CdgCk6GCbLNouVKiWFW9XuTXrd-tyuiCggaq8=',
  peas: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
  lentils: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
  chickpeas: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
  
  // Default fallback
  default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop'
};

// Enhanced market data
const markets = [
  { name: 'Kimironko Market', distance: '2.5 km', products: 45, rating: 4.5 },
  { name: 'Nyabugogo Market', distance: '3.2 km', products: 38, rating: 4.3 },
  { name: 'Gikondo Market', distance: '1.8 km', products: 52, rating: 4.7 },
  { name: 'Kicukiro Market', distance: '4.1 km', products: 29, rating: 4.2 },
  { name: 'Remera Market', distance: '2.8 km', products: 34, rating: 4.4 }
];

const Products = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(new Set());
  const productsPerPage = 16; // Increased for more compact layout

  // Enhanced categories with more options
  const categories = useMemo(() => [
    { value: 'all', label: 'All Products', count: products.length, icon: '📦' },
    { value: 'grains', label: 'Grains', count: products.filter(p => p.category === 'grains').length, icon: '🌾' },
    { value: 'vegetables', label: 'Vegetables', count: products.filter(p => p.category === 'vegetables').length, icon: '🥦' },
    { value: 'fruits', label: 'Fruits', count: products.filter(p => p.category === 'fruits').length, icon: '🍎' },
    { value: 'tubers', label: 'Tubers', count: products.filter(p => p.category === 'tubers').length, icon: '🥔' },
    { value: 'legumes', label: 'Legumes', count: products.filter(p => p.category === 'legumes').length, icon: '🫘' },
    { value: 'spices', label: 'Spices', count: products.filter(p => p.category === 'spices').length, icon: '🌶️' }
  ], [products]);

  // Enhanced filtering and sorting
  const filteredProducts = useMemo(() => {
    return products
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
          case 'newest': return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
          default: return 0;
        }
      });
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced product interaction handlers
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Enhanced Product Image Component
  const ProductImage = ({ product, size = 'small', className = '' }) => {
    const sizeClasses = {
      small: 'w-16 h-16',
      medium: 'w-20 h-20',
      large: 'w-full h-28',
      xlarge: 'w-full h-64'
    };

    const productKey = product.name.toLowerCase().replace(/\s+/g, '');
    const imageUrl = productImages[productKey] || productImages.default;

    return (
      <div className={`${sizeClasses[size]} ${className} rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm`}>
        <img
          src={imageUrl}
          alt={`Fresh ${product.name}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = productImages.default;
          }}
        />
      </div>
    );
  };

  // Ultra Compact Product Card Component
  const CompactProductCard = ({ product }) => {
    const isFavorite = favorites.has(product.id);

    return (
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-green-200 group cursor-pointer flex flex-col h-full"
        onClick={() => handleViewProduct(product)}
      >
        {/* Image Section */}
        <div className="relative h-24 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
          <ProductImage product={product} size="large" />
          
          {/* Favorite Button */}
          <button 
            onClick={(e) => toggleFavorite(product.id, e)}
            className="absolute top-1 right-1 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200"
          >
            <FaHeart 
              className={`w-3 h-3 transition-colors ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'
              }`}
            />
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-1 left-1">
            <span className="px-1.5 py-0.5 bg-white/95 backdrop-blur-sm rounded text-xs font-medium text-gray-700 capitalize shadow-xs">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-xs font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Price and Trend */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-baseline space-x-0.5">
              <span className="text-sm font-bold text-green-600">{product.price}</span>
              <span className="text-[10px] text-gray-500">RWF</span>
            </div>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
              product.trend === 'up' ? 'bg-green-100 text-green-700' : 
              product.trend === 'down' ? 'bg-red-100 text-red-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              {product.change}
            </span>
          </div>

          {/* Market and Rating */}
          <div className="flex items-center justify-between text-[10px] text-gray-600 mb-1">
            <div className="flex items-center space-x-0.5 truncate">
              <FaMapMarkerAlt className="w-2.5 h-2.5 flex-shrink-0" />
              <span className="truncate">{product.market || 'Multiple'}</span>
            </div>
            {product.rating && (
              <div className="flex items-center space-x-0.5">
                <FaStar className="w-2.5 h-2.5 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-50">
            <div className="flex items-center space-x-1 text-[10px] text-gray-500">
              <FaEye className="w-2.5 h-2.5" />
              <span>{product.views || 0}</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleViewProduct(product);
              }}
              className="px-2 py-1 bg-green-500 text-white font-medium rounded text-[10px] hover:bg-green-600 transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced List View Card
  const ListProductCard = ({ product }) => {
    const isFavorite = favorites.has(product.id);

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 hover:shadow-md transition-all duration-200 hover:border-green-200 group cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <ProductImage product={product} size="medium" className="shadow-xs group-hover:shadow-sm transition-shadow duration-200" />
          </div>
          
          <div 
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => handleViewProduct(product)}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-2">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-200 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium capitalize">
                      {product.category}
                    </span>
                    {product.rating && (
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <FaStar className="w-3 h-3 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-bold text-green-600">{product.price}</span>
                    <span className="text-gray-500 text-xs">RWF/{product.unit}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    product.trend === 'up' ? 'bg-green-100 text-green-700' : 
                    product.trend === 'down' ? 'bg-red-100 text-red-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {product.trend === 'up' ? '↗' : product.trend === 'down' ? '↘' : '→'} {product.change}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="w-3 h-3 text-green-500" />
                    <span>{product.market || 'Multiple Markets'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RiCalendarLine className="w-3 h-3 text-green-500" />
                    <span>{product.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={(e) => toggleFavorite(product.id, e)}
              className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaHeart 
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'
                }`}
              />
            </button>
            <button 
              onClick={() => handleViewProduct(product)}
              className="px-3 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-200 text-xs"
            >
              View
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  // Product Card Component selector
  const ProductCard = ({ product, viewMode = 'grid' }) => {
    if (viewMode === 'list') {
      return <ListProductCard product={product} />;
    }
    return <CompactProductCard product={product} />;
  };

  // Enhanced Price Card Component
  const PriceCard = ({ priceData }) => {
    const isFavorite = favorites.has(priceData.id);

    return (
      <div 
        className="bg-white rounded-lg p-2 border border-gray-100 hover:border-green-200 transition-all duration-200 group hover:shadow-sm cursor-pointer"
        onClick={() => handleViewProduct(priceData)}
      >
        <div className="flex items-center space-x-2">
          <ProductImage product={priceData} size="small" className="shadow-xs" />
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <h4 className="font-semibold text-gray-900 text-xs group-hover:text-green-700 transition-colors truncate">
                {priceData.name}
              </h4>
            </div>
            
            <div className="flex items-center space-x-1 mb-1">
              <FaMapMarkerAlt className="w-2.5 h-2.5 text-gray-400" />
              <span className="text-gray-600 text-[10px]">{priceData.market || 'Multiple'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-0.5">
                <span className="text-sm font-bold text-green-600">{priceData.price}</span>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={(e) => toggleFavorite(priceData.id, e)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <FaHeart 
                    className={`w-2.5 h-2.5 transition-colors ${
                      isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'
                    }`}
                  />
                </button>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  priceData.trend === 'up' ? 'bg-green-100 text-green-700' : 
                  priceData.trend === 'down' ? 'bg-red-100 text-red-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {priceData.change}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Market Card Component
  const MarketCard = ({ market }) => (
    <div className="bg-white rounded-lg p-2 border border-gray-100 hover:border-green-200 transition-all duration-200 group hover:shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
          <FaMapMarkerAlt className="w-3 h-3 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-xs mb-0.5 truncate">{market.name}</h4>
          <div className="flex items-center justify-between text-[10px] text-gray-600">
            <span>{market.distance} away</span>
            <span>{market.products} items</span>
          </div>
          <div className="flex items-center space-x-1 mt-0.5">
            <FaStar className="w-2.5 h-2.5 text-yellow-400" />
            <span className="text-[10px] font-medium">{market.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Product Detail Modal
  const ProductDetailModal = () => {
    if (!selectedProduct) return null;

    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < filteredProducts.length - 1;
    const isFavorite = favorites.has(selectedProduct.id);

    const handlePrevProduct = () => {
      if (hasPrevious) {
        setSelectedProduct(filteredProducts[currentIndex - 1]);
      }
    };

    const handleNextProduct = () => {
      if (hasNext) {
        setSelectedProduct(filteredProducts[currentIndex + 1]);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-4 h-4 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => toggleFavorite(selectedProduct.id, e)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaHeart 
                  className={`w-5 h-5 transition-colors ${
                    isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'
                  }`}
                />
              </button>
              <div className="flex space-x-1">
                <button
                  onClick={handlePrevProduct}
                  disabled={!hasPrevious}
                  className={`p-2 rounded-lg transition-colors ${
                    hasPrevious ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <FaArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextProduct}
                  disabled={!hasNext}
                  className={`p-2 rounded-lg transition-colors ${
                    hasNext ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
            <div className="p-4">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <ProductImage product={selectedProduct} size="xlarge" className="rounded-lg shadow-md" />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium capitalize mb-2">
                      {selectedProduct.category}
                    </span>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                    <p className="text-gray-600 text-sm">{selectedProduct.description || 'High quality agricultural product with excellent market value.'}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className="text-3xl font-bold text-green-700">{selectedProduct.price}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedProduct.trend === 'up' ? 'bg-green-100 text-green-700' : 
                        selectedProduct.trend === 'down' ? 'bg-red-100 text-red-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedProduct.trend === 'up' ? '↗' : selectedProduct.trend === 'down' ? '↘' : '→'} {selectedProduct.change}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">Last updated: {selectedProduct.lastUpdated}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                      Compare Prices
                    </button>
                    <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
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

  // Enhanced Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 4;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-1 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded border transition-all duration-200 text-xs ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:text-green-700'
          }`}
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-2 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:text-green-700 transition-all duration-200 text-xs"
            >
              1
            </button>
            {startPage > 2 && <span className="px-1 text-gray-400 text-xs">...</span>}
          </>
        )}

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-2 py-1.5 rounded border transition-all duration-200 text-xs ${
              currentPage === number
                ? 'bg-green-500 text-white border-green-500 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:text-green-700'
            }`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-1 text-gray-400 text-xs">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-2 py-1.5 rounded border border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:text-green-700 transition-all duration-200 text-xs"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded border transition-all duration-200 text-xs ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:text-green-700'
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-4">
      <div className="container mx-auto px-2 sm:px-3">
        {/* Enhanced Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm flex items-center justify-center">
                  <RiPriceTag3Line className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                    Market Products
                  </h1>
                  <p className="text-gray-600 text-xs">Fresh products from local markets</p>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{products.length}</div>
                <div className="text-[10px] text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{markets.length}</div>
                <div className="text-[10px] text-gray-500">Markets</div>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Category Filters */}
          <div className="flex flex-wrap gap-1 mb-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => {
                  setSelectedCategory(category.value);
                  setCurrentPage(1);
                }}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full border transition-all duration-200 text-xs ${
                  selectedCategory === category.value
                    ? 'bg-green-500 text-white border-green-500 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <span className="opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm"
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
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="trend">Sort by Trend</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 px-2 py-2 rounded-lg border transition-all duration-300 text-xs ${
                  viewMode === 'grid' 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 px-2 py-2 rounded-lg border transition-all duration-300 text-xs ${
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

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Products Section */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Available Products
                  {searchTerm && <span className="text-green-600"> for "{searchTerm}"</span>}
                </h2>
                <p className="text-gray-600 text-xs">
                  Showing {Math.min(productsPerPage, currentProducts.length)} of {filteredProducts.length} products
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                  {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                <div className="flex items-center space-x-1 text-xs text-gray-600 bg-white px-2 py-1 rounded-lg border border-green-100">
                  <FaEye className="w-3 h-3" />
                  <span>1.2K views today</span>
                </div>
              </div>
            </div>

            {/* Enhanced Products Display - Ultra dense grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination />

            {/* Enhanced Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <RiPlantLine className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-3 text-xs">
                  We couldn't find any products matching your search criteria.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 2000]);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-sm transition-all duration-300 text-xs"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-3 sticky top-4">
              {/* Live Prices */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                    <FaChartLine className="mr-1 text-green-600 text-xs" />
                    Live Prices
                  </h3>
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">
                    Live
                  </span>
                </div>
                
                <div className="space-y-2">
                  {filteredProducts.slice(0, 5).map((product, index) => (
                    <PriceCard key={index} priceData={product} />
                  ))}
                </div>
              </div>

              {/* Nearby Markets */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center mb-2">
                  <FaMapMarkerAlt className="mr-1 text-green-600 text-xs" />
                  Nearby Markets
                </h3>
                
                <div className="space-y-1.5">
                  {markets.map((market, index) => (
                    <MarketCard key={index} market={market} />
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm p-3 text-white">
                <h4 className="font-semibold mb-2 flex items-center text-xs">
                  <RiCalendarLine className="mr-1" />
                  Today's Stats
                </h4>
                <div className="space-y-1.5 text-[10px]">
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

        {/* Product Detail Modal */}
        {isModalOpen && <ProductDetailModal />}
      </div>
    </div>
  );
};

export default Products;