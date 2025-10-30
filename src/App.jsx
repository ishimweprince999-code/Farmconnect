import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Products from './Pages/Products';
import MarketUpdates from './Pages/MarketUpdates';
import NearbyMarkets from './Pages/NearbyMarkets';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  // Sample data
  const products = [
    { 
      id: 1, 
      name: 'Maize', 
      price: '450 RWF/kg', 
      trend: 'up', 
      change: '+5%', 
      unit: 'kg',
      lastUpdated: '2 hours ago',
      marketCount: 15,
      category: 'grains'
    },
    { 
      id: 2, 
      name: 'Potatoes', 
      price: '600 RWF/kg', 
      trend: 'down', 
      change: '-3%', 
      unit: 'kg',
      lastUpdated: '1 hour ago',
      marketCount: 12,
      category: 'tubers'
    },
    { 
      id: 3, 
      name: 'Beans', 
      price: '800 RWF/kg', 
      trend: 'up', 
      change: '+2%', 
      unit: 'kg',
      lastUpdated: '3 hours ago',
      marketCount: 18,
      category: 'legumes'
    },
    { 
      id: 4, 
      name: 'Tomatoes', 
      price: '1200 RWF/kg', 
      trend: 'stable', 
      change: '0%', 
      unit: 'kg',
      lastUpdated: '4 hours ago',
      marketCount: 10,
      category: 'vegetables'
    },
    { 
      id: 5, 
      name: 'Bananas', 
      price: '700 RWF/kg', 
      trend: 'up', 
      change: '+4%', 
      unit: 'kg',
      lastUpdated: '2 hours ago',
      marketCount: 8,
      category: 'fruits'
    },
    { 
      id: 6, 
      name: 'Cassava', 
      price: '350 RWF/kg', 
      trend: 'down', 
      change: '-2%', 
      unit: 'kg',
      lastUpdated: '5 hours ago',
      marketCount: 6,
      category: 'tubers'
    },
  ];

  const markets = [
    { 
      id: 1, 
      name: 'Kimironko Market', 
      location: 'Gasabo District, Kigali',
      district: 'Gasabo',
      distance: '2.5 km', 
      rating: 4.5,
      hours: '6:00 AM - 8:00 PM',
      products: ['Maize', 'Potatoes', 'Beans', 'Tomatoes', 'Onions', 'Cabbage'],
      bestFor: 'Vegetables & Fruits'
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
      bestFor: 'Grains & Tubers'
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
      bestFor: 'Fresh Produce'
    },
  ];

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home products={products} markets={markets} onPageChange={setCurrentPage} />;
      case 'products':
        return <Products products={products} />;
      case 'markets':
        return <NearbyMarkets markets={markets} onPageChange={setCurrentPage} />;
      case 'updates':
        return <MarketUpdates />;
      case 'login':
        return <Login onPageChange={setCurrentPage} onLogin={handleLogin} />;
      case 'signup':
        return <Signup onPageChange={setCurrentPage} onLogin={handleLogin} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home products={products} markets={markets} onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;