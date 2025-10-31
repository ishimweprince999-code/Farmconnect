import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import MarketUpdates from "./Pages/MarketUpdates";
import NearbyMarkets from "./Pages/NearbyMarkets";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import Profile from "./Pages/Profile";
import ProductDetail from "./Pages/ProductDetail";
import MarketDetail from "./Pages/MarketDetail";
import PriceTrends from "./Pages/PriceTrends";

function App() {
  // ✅ Example product data
  const products = [
    { id: 1, name: "Bananas", price: "700 RWF/kg", image: "/images/bananas.jpg" },
    { id: 2, name: "Tomatoes", price: "1200 RWF/kg", image: "/images/tomatoes.jpg" },
    { id: 3, name: "Potatoes", price: "600 RWF/kg", image: "/images/potatoes.jpg" },
    { id: 4, name: "Beans", price: "800 RWF/kg", image: "/images/beans.jpg" },
  ];

  // ✅ Example market data
  const markets = [
    { id: 1, name: "Kimironko Market", location: "Gasabo District, Kigali" },
    { id: 2, name: "Nyabugogo Market", location: "Nyarugenge District, Kigali" },
    { id: 3, name: "Remera Market", location: "Gasabo District, Kigali" },
  ];

  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column" }}>
        {/* 🧭 Navigation */}
        <Navbar />

        {/* 📄 Page Content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home products={products} markets={markets} />} />
            <Route path="/products" element={<Products products={products} />} />
            <Route path="/markets" element={<NearbyMarkets markets={markets} />} />
            <Route path="/updates" element={<MarketUpdates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/market/:id" element={<MarketDetail />} />
            <Route path="/trends" element={<PriceTrends />} />
          </Routes>
        </main>

        {/* ⚙️ Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
