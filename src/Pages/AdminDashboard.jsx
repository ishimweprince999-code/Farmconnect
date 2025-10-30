import React, { useState } from 'react';
import { FaChartBar, FaUsers, FaShoppingBag, FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    { id: 1, name: 'Maize', price: '450 RWF/kg', category: 'grains', status: 'active' },
    { id: 2, name: 'Potatoes', price: '600 RWF/kg', category: 'tubers', status: 'active' },
    { id: 3, name: 'Beans', price: '800 RWF/kg', category: 'legumes', status: 'inactive' },
  ]);
  const [markets, setMarkets] = useState([
    { id: 1, name: 'Kimironko Market', location: 'Gasabo', status: 'active', products: 25 },
    { id: 2, name: 'Nyabugogo Market', location: 'Nyarugenge', status: 'active', products: 30 },
    { id: 3, name: 'Remera Market', location: 'Gasabo', status: 'pending', products: 18 },
  ]);

  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: FaUsers, color: 'blue' },
    { label: 'Active Products', value: '156', change: '+5%', icon: FaShoppingBag, color: 'green' },
    { label: 'Registered Markets', value: '42', change: '+8%', icon: FaMapMarkerAlt, color: 'purple' },
    { label: 'Daily Visits', value: '2,847', change: '+15%', icon: FaChartBar, color: 'orange' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleDeleteMarket = (id) => {
    setMarkets(markets.filter(market => market.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage farmers, markets, and products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b">
            <nav className="flex -mb-px">
              {['overview', 'products', 'markets', 'users', 'reports'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition duration-200 ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <button className="bg-green-50 border border-green-200 rounded-lg p-4 text-left hover:bg-green-100 transition duration-200">
                    <FaPlus className="text-green-600 mb-2" />
                    <div className="font-medium text-green-800">Add New Product</div>
                    <div className="text-sm text-green-600">Add current market prices</div>
                  </button>
                  <button className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 transition duration-200">
                    <FaPlus className="text-blue-600 mb-2" />
                    <div className="font-medium text-blue-800">Register Market</div>
                    <div className="text-sm text-blue-600">Add new market location</div>
                  </button>
                  <button className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 transition duration-200">
                    <FaChartBar className="text-purple-600 mb-2" />
                    <div className="font-medium text-purple-800">Generate Report</div>
                    <div className="text-sm text-purple-600">View market analytics</div>
                  </button>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Manage Products</h3>
                  <button className="btn-primary flex items-center">
                    <FaPlus className="mr-2" />
                    Add Product
                  </button>
                </div>

                <div className="bg-white border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <FaEdit />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Markets Tab */}
            {activeTab === 'markets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Manage Markets</h3>
                  <button className="btn-primary flex items-center">
                    <FaPlus className="mr-2" />
                    Add Market
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {markets.map(market => (
                    <div key={market.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold text-gray-800">{market.name}</h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          market.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {market.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{market.location} District</p>
                      <p className="text-gray-600 text-sm mb-4">{market.products} products</p>
                      <div className="flex space-x-2">
                        <button className="flex-1 btn-secondary text-sm py-2">
                          <FaEdit className="inline mr-1" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteMarket(market.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-3 rounded transition duration-200"
                        >
                          <FaTrash className="inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">User Management</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    User management features will be implemented in the next version.
                  </p>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Analytics & Reports</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    Advanced analytics and reporting dashboard coming soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;