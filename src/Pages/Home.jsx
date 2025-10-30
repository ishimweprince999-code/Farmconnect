import React, { useState } from 'react';
import { 
  HiSearch, 
  HiMap, 
  HiChartBar, 
  HiNewspaper,
  HiTrendingUp,
  HiShoppingCart,
  HiUserGroup,
  HiPhone
} from 'react-icons/hi';
import { 
  RiPlantLine,
  RiCustomerService2Line,
  RiSecurePaymentLine,
  RiTimerLine
} from 'react-icons/ri';
import ProductCard from '../Components/ProductCard';
import MarketCard from '../Components/MarketCard';

const Home = ({ products, markets, onPageChange, language = 'en' }) => {
  const featuredProducts = products.slice(0, 6);
  const featuredMarkets = markets.slice(0, 3);
  const [searchQuery, setSearchQuery] = useState('');

  // Translation content
  const translations = {
    en: {
      hero: {
        title: "Farmers Market",
        subtitle: "Price & Market Information System",
        description: "Empowering farmers with real-time market data to maximize profits and make better selling decisions",
        searchPlaceholder: "Search products, markets...",
        button1: "Check Current Prices",
        button2: "Find Nearby Markets"
      },
      features: {
        title: "How We Help Farmers",
        items: [
          {
            title: "Real-time Prices",
            description: "Get updated market prices for all agricultural products"
          },
          {
            title: "Nearby Markets",
            description: "Find the best markets close to your location"
          },
          {
            title: "Price Trends",
            description: "Analyze price patterns to make informed decisions"
          },
          {
            title: "Market Updates",
            description: "Stay informed with latest market news and alerts"
          }
        ]
      },
      products: {
        title: "Current Product Prices",
        viewAll: "View All Products"
      },
      markets: {
        title: "Nearby Markets",
        viewAll: "View All Markets"
      },
      stats: {
        title: "Trusted by Farmers Nationwide",
        farmers: "10,000+",
        farmersLabel: "Happy Farmers",
        products: "50+",
        productsLabel: "Products Tracked",
        markets: "200+",
        marketsLabel: "Active Markets",
        updates: "1,000+",
        updatesLabel: "Daily Updates"
      },
      cta: {
        title: "Ready to Maximize Your Profits?",
        description: "Join thousands of farmers who are already making smarter selling decisions",
        button: "Get Started Today"
      }
    },
    kin: {
      hero: {
        title: "Isoko y'Abahinzi",
        subtitle: "Sisitemu y'Amakuru y'Ibiciro n'Isoko",
        description: "Duhaye abahinzi amakuru y'isoko mu gihe icyo ari cyo kugira ngo bongere inyungu banakire ibyemezo bihariye",
        searchPlaceholder: "Shaka ibicuruzwa, isoko...",
        button1: "Reba Ibiciro",
        button2: "Shaka Isoko Ziri Hafi"
      },
      features: {
        title: "Uko Dufasha Abahinzi",
        items: [
          {
            title: "Ibiciro mu Gihe Cyo",
            description: "Kura amakuru y'ibiciro by'isoko ku bicuruzwa byose by'ubuhinzi"
          },
          {
            title: "Isoko Ziri Hafi",
            description: "Shaka isoko nziza ziri hafi yawe"
          },
          {
            title: "Imiterere y'Ibiciro",
            description: "Gerageza imiterere y'ibiciro kugira ngo ucure ibyemezo bihariye"
          },
          {
            title: "Amakuru Ku Isoko",
            description: "Menya amakuru mashya ku isoko n'ibikenewe"
          }
        ]
      },
      products: {
        title: "Ibiciro by'Ibicuruzwa",
        viewAll: "Reba Ibicuruzwa Byose"
      },
      markets: {
        title: "Isoko Ziri Hafi",
        viewAll: "Reba Isoko Zose"
      },
      stats: {
        title: "Byizewe n'Abahinzi mu Rwanda",
        farmers: "10,000+",
        farmersLabel: "Abahinzi Bihebuje",
        products: "50+",
        productsLabel: "Ibicuruzwa Buriho",
        markets: "200+",
        marketsLabel: "Isoko Zikora",
        updates: "1,000+",
        updatesLabel: "Amakuru every"
      },
      cta: {
        title: "Witeguye Kongera Inyungu?",
        description: "Winjire mu bihumbi by'abahinzi bari buracyakora ibyemezo bihariye",
        button: "Tangira Noneho"
      }
    },
    fr: {
      hero: {
        title: "Marché des Agriculteurs",
        subtitle: "Système d'Information sur les Prix et Marchés",
        description: "Donner aux agriculteurs des données de marché en temps réel pour maximiser les profits et prendre de meilleures décisions de vente",
        searchPlaceholder: "Rechercher produits, marchés...",
        button1: "Voir les Prix Actuels",
        button2: "Trouver les Marchés à Proximité"
      },
      features: {
        title: "Comment Nous Aidons les Agriculteurs",
        items: [
          {
            title: "Prix en Temps Réel",
            description: "Obtenez les prix actualisés du marché pour tous les produits agricoles"
          },
          {
            title: "Marchés à Proximité",
            description: "Trouvez les meilleurs marchés près de chez vous"
          },
          {
            title: "Tendances des Prix",
            description: "Analysez les modèles de prix pour prendre des décisions éclairées"
          },
          {
            title: "Actualités du Marché",
            description: "Restez informé des dernières nouvelles et alertes du marché"
          }
        ]
      },
      products: {
        title: "Prix Actuels des Produits",
        viewAll: "Voir Tous les Produits"
      },
      markets: {
        title: "Marchés à Proximité",
        viewAll: "Voir Tous les Marchés"
      },
      stats: {
        title: "De Confiance par les Agriculteurs Nationaux",
        farmers: "10,000+",
        farmersLabel: "Agriculteurs Satisfaits",
        products: "50+",
        productsLabel: "Produits Suivis",
        markets: "200+",
        marketsLabel: "Marchés Actifs",
        updates: "1,000+",
        updatesLabel: "Mises à Jour Quotidiennes"
      },
      cta: {
        title: "Prêt à Maximiser Vos Profits?",
        description: "Rejoignez des milliers d'agriculteurs qui prennent déjà des décisions de vente plus intelligentes",
        button: "Commencer Aujourd'hui"
      }
    }
  };

  const t = translations[language] || translations.en;

  const features = [
    {
      icon: <RiTimerLine className="text-amber-500" size={28} />,
      title: t.features.items[0].title,
      description: t.features.items[0].description,
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-200"
    },
    {
      icon: <HiMap className="text-emerald-500" size={28} />,
      title: t.features.items[1].title,
      description: t.features.items[1].description,
      gradient: "from-emerald-50 to-green-50",
      border: "border-emerald-200"
    },
    {
      icon: <HiTrendingUp className="text-blue-500" size={28} />,
      title: t.features.items[2].title,
      description: t.features.items[2].description,
      gradient: "from-blue-50 to-cyan-50",
      border: "border-blue-200"
    },
    {
      icon: <HiNewspaper className="text-purple-500" size={28} />,
      title: t.features.items[3].title,
      description: t.features.items[3].description,
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-200"
    }
  ];

  const stats = [
    {
      icon: <HiUserGroup className="text-green-600" size={24} />,
      value: t.stats.farmers,
      label: t.stats.farmersLabel,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: <RiPlantLine className="text-blue-600" size={24} />,
      value: t.stats.products,
      label: t.stats.productsLabel,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <HiMap className="text-amber-600" size={24} />,
      value: t.stats.markets,
      label: t.stats.marketsLabel,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      icon: <HiNewspaper className="text-purple-600" size={24} />,
      value: t.stats.updates,
      label: t.stats.updatesLabel,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onPageChange('products');
    }
  };

  // Customizable hero section settings
  const heroSettings = {
    backgroundImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    height: '85vh', // Customizable height - not too big, not too small
    minHeight: '600px', // Minimum height to ensure good visibility
    maxHeight: '800px', // Maximum height to prevent being too tall
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
    imageFilters: {
      brightness: 1.1,
      contrast: 1.1,
      saturation: 1.2
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section with Customizable Background Image */}
      <section 
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: heroSettings.height,
          minHeight: heroSettings.minHeight,
          maxHeight: heroSettings.maxHeight
        }}
      >
        
        {/* Background Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${heroSettings.backgroundImage}')`,
              filter: `brightness(${heroSettings.imageFilters.brightness}) contrast(${heroSettings.imageFilters.contrast}) saturate(${heroSettings.imageFilters.saturation})`
            }}
          >
            {/* Customizable Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: heroSettings.overlay
              }}
            ></div>
          </div>
          
          {/* Wave Transition */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-white/40 mb-8 shadow-lg">
              <RiSecurePaymentLine className="mr-2 text-green-600" size={20} />
              <span className="text-green-800 font-semibold text-sm">Trusted by 10,000+ Farmers</span>
            </div>

            {/* Main Title with Better Text Visibility */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
              style={{ textShadow: heroSettings.textShadow }}
            >
              {t.hero.title}
              <span className="block text-green-100 text-xl md:text-2xl lg:text-3xl mt-4 font-medium">
                {t.hero.subtitle}
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-green-50 leading-relaxed"
              style={{ textShadow: heroSettings.textShadow }}
            >
              {t.hero.description}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full pl-12 pr-32 py-4 text-gray-900 rounded-2xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-lg bg-white/95"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onPageChange('products')}
                className="bg-white text-green-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-green-50"
              >
                <HiShoppingCart className="mr-3 w-5 h-5" />
                <span>{t.hero.button1}</span>
              </button>
              <button 
                onClick={() => onPageChange('markets')}
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-green-700 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                <HiMap className="mr-3 w-5 h-5" />
                <span>{t.hero.button2}</span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 animate-bounce">
              <div className="w-8 h-12 border-2 border-green-300 rounded-full flex justify-center mx-auto">
                <div className="w-1.5 h-3 bg-green-400 rounded-full mt-3 animate-pulse"></div>
              </div>
              <p className="text-green-200 text-sm mt-2">Scroll to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain exactly the same */}
      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {t.stats.title}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${stat.bg} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            {t.features.title}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for modern farmers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div className="flex-1 mb-8 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {t.products.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Real-time prices updated every hour from markets across the region
              </p>
            </div>
            <button 
              onClick={() => onPageChange('products')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
            >
              <HiShoppingCart className="w-5 h-5" />
              <span>{t.products.viewAll}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div className="flex-1 mb-8 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {t.markets.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Discover the best places to sell your products with detailed market information
              </p>
            </div>
            <button 
              onClick={() => onPageChange('markets')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
            >
              <HiMap className="w-5 h-5" />
              <span>{t.markets.viewAll}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMarkets.map(market => (
              <MarketCard key={market.id} market={market} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              {t.cta.title}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.cta.description}
            </p>
            <button 
              onClick={() => onPageChange('signup')}
              className="bg-white text-green-700 hover:bg-green-50 font-bold py-4 px-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3 text-lg"
            >
              <RiCustomerService2Line className="w-6 h-6" />
              <span>{t.cta.button}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;