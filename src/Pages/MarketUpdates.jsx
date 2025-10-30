import React, { useState, useEffect } from 'react';
import { 
  FaNewspaper, 
  FaCalendarAlt, 
  FaFilter, 
  FaArrowRight, 
  FaSearch,
  FaBell,
  FaBookmark,
  FaShare,
  FaEye,
  FaRegBookmark,
  FaRegClock,
  FaTag,
  FaUser,
  FaMapMarkerAlt,
  FaChartLine,
  FaSeedling,
  FaTint,
  FaTractor
} from 'react-icons/fa';

const MarketUpdates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [bookmarkedUpdates, setBookmarkedUpdates] = useState(new Set());
  const [viewedUpdates, setViewedUpdates] = useState(new Set());
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [email, setEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const categories = ['all', 'price-alerts', 'government', 'weather', 'market-news', 'tips', 'technology', 'events'];

  const updates = [
    {
      id: 1,
      title: 'High Demand for Potatoes Expected This Week',
      summary: 'Market analysts predict increased demand for potatoes due to upcoming festivals and export opportunities. Prices expected to rise by 15-20%.',
      category: 'price-alerts',
      date: '2024-01-15',
      readTime: '2 min read',
      featured: true,
      author: 'Market Analysis Team',
      location: 'National',
      views: 1247,
      tags: ['potatoes', 'demand', 'festival'],
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'New Agricultural Subsidies Announced by Government',
      summary: 'The Ministry of Agriculture announces new subsidies for maize and bean farmers. Up to 40% subsidy on seeds and fertilizers.',
      category: 'government',
      date: '2024-01-14',
      readTime: '3 min read',
      featured: true,
      author: 'Government Press',
      location: 'Kigali',
      views: 892,
      tags: ['subsidy', 'government', 'maize', 'beans'],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Favorable Weather Conditions for Crop Growth',
      summary: 'Meteorological department forecasts optimal weather for the next two weeks. Perfect conditions for maize and vegetable cultivation.',
      category: 'weather',
      date: '2024-01-13',
      readTime: '1 min read',
      featured: false,
      author: 'Weather Department',
      location: 'Eastern Province',
      views: 567,
      tags: ['weather', 'forecast', 'rain'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Tips for Better Crop Storage and Preservation',
      summary: 'Learn effective techniques to preserve your harvest and reduce post-harvest losses. Expert advice on storage solutions.',
      category: 'tips',
      date: '2024-01-12',
      readTime: '4 min read',
      featured: false,
      author: 'Agricultural Expert',
      location: 'National',
      views: 1234,
      tags: ['storage', 'preservation', 'tips'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'New Market Regulations to Take Effect Next Month',
      summary: 'Updated market policies aimed at improving transparency and fair pricing. New quality standards implemented.',
      category: 'market-news',
      date: '2024-01-11',
      readTime: '2 min read',
      featured: false,
      author: 'Market Regulatory Board',
      location: 'All Markets',
      views: 789,
      tags: ['regulations', 'policy', 'quality'],
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Bean Prices Show Steady Increase Across Markets',
      summary: 'Consistent price growth observed for beans in major trading centers. Export demand driving prices up.',
      category: 'price-alerts',
      date: '2024-01-10',
      readTime: '2 min read',
      featured: false,
      author: 'Price Monitoring Team',
      location: 'Western Province',
      views: 645,
      tags: ['beans', 'prices', 'export'],
      image: 'https://images.unsplash.com/photo-1596040033221-a1d166e75ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 7,
      title: 'New Mobile App for Farmers Launched',
      summary: 'Revolutionary mobile application helps farmers track prices, weather, and connect with buyers directly.',
      category: 'technology',
      date: '2024-01-09',
      readTime: '3 min read',
      featured: true,
      author: 'Tech Innovation Team',
      location: 'National',
      views: 1567,
      tags: ['technology', 'mobile', 'innovation'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      title: 'Agricultural Fair and Exhibition Next Month',
      summary: 'Annual agricultural fair featuring new technologies, equipment demonstrations, and expert workshops.',
      category: 'events',
      date: '2024-01-08',
      readTime: '2 min read',
      featured: false,
      author: 'Event Organizers',
      location: 'Kigali Convention Center',
      views: 432,
      tags: ['events', 'fair', 'exhibition'],
      image: 'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 9,
      title: 'Irrigation Technology Workshop for Farmers',
      summary: 'Free workshops on modern irrigation techniques and water conservation methods.',
      category: 'technology',
      date: '2024-01-07',
      readTime: '2 min read',
      featured: false,
      author: 'Agricultural Extension',
      location: 'Southern Province',
      views: 321,
      tags: ['irrigation', 'workshop', 'technology'],
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 10,
      title: 'Organic Farming Certification Program',
      summary: 'New government program to certify organic farmers and provide market access.',
      category: 'government',
      date: '2024-01-06',
      readTime: '3 min read',
      featured: false,
      author: 'Organic Standards Board',
      location: 'National',
      views: 876,
      tags: ['organic', 'certification', 'government'],
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Filter and sort updates
  const filteredUpdates = updates
    .filter(update => {
      const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;
      const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           update.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           update.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBookmark = !showBookmarkedOnly || bookmarkedUpdates.has(update.id);
      return matchesCategory && matchesSearch && matchesBookmark;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date) - new Date(a.date);
        case 'views':
          return b.views - a.views;
        case 'readTime':
          return parseInt(a.readTime) - parseInt(b.readTime);
        default:
          return 0;
      }
    });

  const featuredUpdates = filteredUpdates.filter(update => update.featured);
  const regularUpdates = filteredUpdates.filter(update => !update.featured);

  const getCategoryColor = (category) => {
    const colors = {
      'price-alerts': 'bg-red-100 text-red-800 border-red-200',
      'government': 'bg-blue-100 text-blue-800 border-blue-200',
      'weather': 'bg-sky-100 text-sky-800 border-sky-200',
      'market-news': 'bg-green-100 text-green-800 border-green-200',
      'tips': 'bg-purple-100 text-purple-800 border-purple-200',
      'technology': 'bg-orange-100 text-orange-800 border-orange-200',
      'events': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'price-alerts': <FaChartLine className="mr-1" size={12} />,
      'government': <FaUser className="mr-1" size={12} />,
      'weather': <FaTint className="mr-1" size={12} />,
      'market-news': <FaNewspaper className="mr-1" size={12} />,
      'tips': <FaSeedling className="mr-1" size={12} />,
      'technology': <FaTractor className="mr-1" size={12} />,
      'events': <FaCalendarAlt className="mr-1" size={12} />
    };
    return icons[category] || <FaNewspaper className="mr-1" size={12} />;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'price-alerts': 'Price Alert',
      'government': 'Government',
      'weather': 'Weather',
      'market-news': 'Market News',
      'tips': 'Farmer Tips',
      'technology': 'Technology',
      'events': 'Events'
    };
    return labels[category] || 'Update';
  };

  const toggleBookmark = (updateId) => {
    const newBookmarks = new Set(bookmarkedUpdates);
    if (newBookmarks.has(updateId)) {
      newBookmarks.delete(updateId);
    } else {
      newBookmarks.add(updateId);
    }
    setBookmarkedUpdates(newBookmarks);
  };

  const markAsViewed = (updateId) => {
    const newViewed = new Set(viewedUpdates);
    newViewed.add(updateId);
    setViewedUpdates(newViewed);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscriptionSuccess(true);
      setEmail('');
      setTimeout(() => setSubscriptionSuccess(false), 3000);
    }
  };

  const shareUpdate = async (update) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: update.title,
          text: update.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${update.title} - ${update.summary}`);
      alert('Update link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg">
            <FaNewspaper className="text-green-600 text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-green-800 mb-4">Market Updates & News</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest market trends, government announcements, weather updates, and agricultural insights
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search updates, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="latest">Latest First</option>
                <option value="views">Most Viewed</option>
                <option value="readTime">Quick Reads</option>
              </select>

              <button
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showBookmarkedOnly
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaBookmark size={14} />
                Bookmarks
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(category)}
                {category === 'all' ? 'All Updates' : getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-800">{updates.length}</div>
            <div className="text-gray-600">Total Updates</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-800">{bookmarkedUpdates.size}</div>
            <div className="text-gray-600">Bookmarked</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-gray-800">
              {updates.filter(u => u.featured).length}
            </div>
            <div className="text-gray-600">Featured</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="text-2xl font-bold text-gray-800">
              {updates.reduce((sum, u) => sum + u.views, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Featured Updates */}
        {featuredUpdates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
              <FaCalendarAlt className="mr-3 text-green-600" />
              Featured Updates
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredUpdates.map(update => (
                <div key={update.id} className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {update.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={update.image} 
                        alt={update.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(update.category)} flex items-center`}>
                        {getCategoryIcon(update.category)}
                        {getCategoryLabel(update.category)}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleBookmark(update.id)}
                          className="text-gray-400 hover:text-yellow-500 transition-colors"
                        >
                          {bookmarkedUpdates.has(update.id) ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                        <button
                          onClick={() => shareUpdate(update)}
                          className="text-gray-400 hover:text-green-600 transition-colors"
                        >
                          <FaShare size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-green-800 mb-3 leading-tight">{update.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{update.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {update.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm flex items-center">
                          <FaTag className="mr-1" size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <FaUser className="mr-1" size={12} />
                          {update.author}
                        </span>
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" size={12} />
                          {update.location}
                        </span>
                        <span className="flex items-center">
                          <FaEye className="mr-1" size={12} />
                          {update.views}
                        </span>
                      </div>
                      <span className="flex items-center">
                        <FaRegClock className="mr-1" size={12} />
                        {update.readTime}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" size={12} />
                        {new Date(update.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <button 
                        onClick={() => markAsViewed(update.id)}
                        className="text-green-600 hover:text-green-800 font-semibold flex items-center transition-colors"
                      >
                        Read Full Story <FaArrowRight className="ml-2" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Updates */}
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-6">All Market Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularUpdates.map(update => (
              <div 
                key={update.id} 
                className={`bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewedUpdates.has(update.id) ? 'border-green-300' : 'border-gray-200'
                }`}
              >
                {update.image && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={update.image} 
                      alt={update.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(update.category)} flex items-center`}>
                      {getCategoryIcon(update.category)}
                      {getCategoryLabel(update.category)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleBookmark(update.id)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        {bookmarkedUpdates.has(update.id) ? <FaBookmark size={12} /> : <FaRegBookmark size={12} />}
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-green-800 mb-2 leading-tight line-clamp-2">{update.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{update.summary}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {update.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                    {update.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{update.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <span>{update.author}</span>
                      <span className="flex items-center">
                        <FaEye className="mr-1" size={10} />
                        {update.views}
                      </span>
                    </div>
                    <span>{update.readTime}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={() => markAsViewed(update.id)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center transition-colors"
                    >
                      Read <FaArrowRight className="ml-1" size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUpdates.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-gray-400 text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-3">No updates found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {showBookmarkedOnly 
                  ? "You haven't bookmarked any updates yet." 
                  : "Try selecting a different category or adjusting your search."}
              </p>
              {(searchQuery || selectedCategory !== 'all' || showBookmarkedOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setShowBookmarkedOnly(false);
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white text-center shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <FaBell className="text-white text-2xl" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Never Miss an Update</h3>
            <p className="mb-6 text-green-100 text-lg leading-relaxed">
              Get the latest market updates, price alerts, and agricultural insights delivered directly to your inbox
            </p>
            
            {subscriptionSuccess ? (
              <div className="bg-green-500 text-white py-4 px-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 bg-white text-green-600 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span className="font-semibold">Successfully subscribed! Check your email for confirmation.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 text-lg min-w-0"
                  required
                />
                <button 
                  type="submit"
                  className="bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition duration-200 flex items-center justify-center gap-3 text-lg whitespace-nowrap"
                >
                  <FaBell />
                  Subscribe Now
                </button>
              </form>
            )}
            
            <p className="text-green-200 text-sm mt-4">
              Join 10,000+ farmers who stay informed with our updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketUpdates;