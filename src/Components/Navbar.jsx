import React, { useState } from 'react';
import { 
  HiMenuAlt3, HiX, HiHome, HiMap, HiNewspaper,
  HiUserCircle, HiChevronDown, HiChartBar, HiCog, HiGlobe,
  HiUser, HiShoppingBag
} from 'react-icons/hi';
import { RiPlantLine, RiPriceTag3Line } from 'react-icons/ri';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// ✅ Complete Translation System
const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      markets: 'Markets',
      updates: 'Updates',
      trends: 'Price Trends',
      resources: 'Resources',
      login: 'Sign In',
      signup: 'Get Started',
      profile: 'My Profile',
      dashboard: 'Dashboard',
      settings: 'Settings',
      logout: 'Sign Out',
      language: 'Language',
      description: {
        home: 'Dashboard overview',
        products: 'Price information',
        markets: 'Nearby locations',
        updates: 'Market news',
        trends: 'Price analysis',
        resources: 'Farmer guides'
      }
    },
    brand: { 
      name: 'FarmConnect', 
      tagline: 'Market Intelligence' 
    },
    common: {
      welcome: 'Welcome to FarmConnect',
      search: 'Search products...',
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      close: 'Close',
      confirm: 'Confirm',
      success: 'Success!',
      error: 'Error!',
      warning: 'Warning!'
    }
  },
  kin: {
    nav: {
      home: 'Ahabanza',
      products: 'Ibicuruzwa',
      markets: 'Isoko',
      updates: 'Amakuru',
      trends: 'Imiterere y\'Ibiciro',
      resources: 'Ibikoresho',
      login: 'Injira',
      signup: 'Tangira',
      profile: 'Umwirondoro',
      dashboard: 'Dashiboda',
      settings: 'Igenamiterere',
      logout: 'Sohoka',
      language: 'Ururimi',
      description: {
        home: 'Reba ibyerekeye isoko',
        products: 'Amakuru y\'ibiciro',
        markets: 'Isoko ziri hafi',
        updates: 'Amakuru mashya ku isoko',
        trends: 'Gusesengura ibiciro',
        resources: 'Amabwiriza k\'abahinzi'
      }
    },
    brand: { 
      name: 'FarmConnect', 
      tagline: 'Ubwenge ku Isoko' 
    },
    common: {
      welcome: 'Murakaza neza kuri FarmConnect',
      search: 'Shaka ibicuruzwa...',
      loading: 'Birakorwa...',
      save: 'Bika',
      cancel: 'Hagarika',
      delete: 'Siba',
      edit: 'Hindura',
      view: 'Reba',
      close: 'Funga',
      confirm: 'Emeza',
      success: 'Byakunze!',
      error: 'Ikosa!',
      warning: 'Iburira!'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      products: 'Produits',
      markets: 'Marchés',
      updates: 'Actualités',
      trends: 'Tendances des Prix',
      resources: 'Ressources',
      login: 'Connexion',
      signup: 'Commencer',
      profile: 'Mon Profil',
      dashboard: 'Tableau de Bord',
      settings: 'Paramètres',
      logout: 'Déconnexion',
      language: 'Langue',
      description: {
        home: 'Aperçu du tableau de bord',
        products: 'Informations sur les prix',
        markets: 'Lieux à proximité',
        updates: 'Nouvelles du marché',
        trends: 'Analyse des prix',
        resources: 'Guides agricoles'
      }
    },
    brand: { 
      name: 'FarmConnect', 
      tagline: 'Intelligence de Marché' 
    },
    common: {
      welcome: 'Bienvenue sur FarmConnect',
      search: 'Rechercher des produits...',
      loading: 'Chargement...',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      close: 'Fermer',
      confirm: 'Confirmer',
      success: 'Succès!',
      error: 'Erreur!',
      warning: 'Avertissement!'
    }
  }
};

const Navbar = ({ 
  user, 
  onLogout, 
  language = 'en', 
  onLanguageChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;
  
  const t = translations[language] || translations.en;

  const navItems = [
    { 
      id: 'home', 
      path: '/',
      label: t.nav.home, 
      icon: <HiHome className="w-5 h-5" />,
      description: t.nav.description.home
    },
    { 
      id: 'products', 
      path: '/products',
      label: t.nav.products, 
      icon: <HiShoppingBag className="w-5 h-5" />,
      description: t.nav.description.products
    },
    { 
      id: 'markets', 
      path: '/markets',
      label: t.nav.markets, 
      icon: <HiMap className="w-5 h-5" />,
      description: t.nav.description.markets
    },
    { 
      id: 'updates', 
      path: '/updates',
      label: t.nav.updates, 
      icon: <HiNewspaper className="w-5 h-5" />,
      description: t.nav.description.updates
    },
   
    
  ];

  const userMenuItems = [
    { id: 'profile', path: '/profile', label: t.nav.profile, icon: <HiUserCircle className="w-4 h-4" /> },
    { id: 'dashboard', path: '/admin', label: t.nav.dashboard, icon: <HiChartBar className="w-4 h-4" /> },
    { id: 'settings', path: '/settings', label: t.nav.settings, icon: <HiCog className="w-4 h-4" /> },
  ];

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'kin', name: 'Kinyarwanda', flag: '🇷🇼', native: 'Ikinyarwanda' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français' }
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  const isActivePath = (path) => {
    if (path === '/') {
      return currentPage === '/';
    }
    return currentPage.startsWith(path);
  };

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center py-4">
          
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-2 rounded-xl shadow-lg">
              <RiPlantLine className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">{t.brand.name}</h1>
              <p className="text-green-600 text-sm">{t.brand.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`group relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-green-100 text-green-700 border border-green-200 shadow-sm'
                    : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
                
                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
                  {item.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
              >
                <HiGlobe className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {currentLanguage?.flag} {currentLanguage?.name}
                </span>
                <HiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isLanguageMenuOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl border border-gray-200 rounded-xl py-3 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {t.nav.language}
                    </p>
                  </div>
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 ${
                        language === lang.code
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-xs text-gray-500">{lang.native}</span>
                      </div>
                      {language === lang.code && (
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu or Auth Buttons */}
            {user ? (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:border-green-400 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <HiChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-200 rounded-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {userMenuItems.map(item => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <HiUser className="w-4 h-4" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  {t.nav.login}
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
                >
                  {t.nav.signup}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-green-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Mobile Auth Section */}
              {!user && (
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <button 
                    onClick={() => handleNavClick('/login')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <HiUser className="w-5 h-5" />
                    <span className="font-medium">{t.nav.login}</span>
                  </button>
                  <button 
                    onClick={() => handleNavClick('/signup')}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-green-600 text-white rounded-lg shadow-md transition-colors duration-200"
                  >
                    <HiUserCircle className="w-5 h-5" />
                    <span className="font-medium">{t.nav.signup}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdowns */}
      {(isLanguageMenuOpen || isUserMenuOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLanguageMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;