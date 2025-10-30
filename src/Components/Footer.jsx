import React, { useState } from 'react';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight,
  FaApple, FaGooglePlay, FaSeedling, FaShieldAlt, FaHeadset
} from 'react-icons/fa';
import { RiPlantLine, RiPhoneFill, RiCustomerService2Fill } from 'react-icons/ri';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'Market Prices', href: '#' },
    { name: 'Nearby Markets', href: '#' },
    { name: 'Crop Calendar', href: '#' },
    { name: 'Weather Forecast', href: '#' },
    { name: 'Farming Tips', href: '#' }
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Support', href: '#' },
    { name: 'Farmers Guide', href: '#' },
    { name: 'Market Analysis', href: '#' },
    { name: 'Training Programs', href: '#' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Our Mission', href: '#' },
    { name: 'Success Stories', href: '#' },
    { name: 'Partnerships', href: '#' },
    { name: 'Careers', href: '#' }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', color: 'hover:text-blue-400' },
    { icon: FaTwitter, href: '#', color: 'hover:text-blue-300' },
    { icon: FaInstagram, href: '#', color: 'hover:text-pink-400' },
    { icon: FaLinkedin, href: '#', color: 'hover:text-blue-500' },
    { icon: FaYoutube, href: '#', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Newsletter Section - Made Compact */}
        <div className="border-b border-green-700/50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
                  <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                    <RiPlantLine className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-green-200 to-green-100 bg-clip-text text-transparent">
                      Market Updates
                    </h3>
                    <p className="text-green-200 text-sm">Get price alerts & insights</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 max-w-md w-full">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-green-600/50 rounded-xl placeholder-green-300 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group text-sm"
                  >
                    <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </form>
                {isSubscribed && (
                  <p className="text-green-300 text-xs mt-2 text-center animate-in fade-in-50">
                    🎉 Thank you for subscribing!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links - Made More Compact */}
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-8 xl:gap-8">
            {/* Brand Section */}
            <div className="xl:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-2 rounded-xl shadow-lg">
                  <RiPlantLine className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    FarmConnect
                  </h2>
                  <p className="text-green-200 text-xs">Market Intelligence Platform</p>
                </div>
              </div>
              <p className="text-green-200 mb-4 leading-relaxed text-sm">
                Empowering farmers with real-time market intelligence and smart farming insights.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3 mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${social.color} backdrop-blur-sm`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* App Download Buttons */}
              <div className="space-y-2">
                <p className="text-green-200 text-xs font-semibold">Download Our App</p>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 bg-black/30 hover:bg-black/40 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 flex-1 text-xs">
                    <FaApple className="w-4 h-4" />
                    <div className="text-left">
                      <p className="text-green-200">Download on</p>
                      <p className="font-semibold">App Store</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-2 bg-black/30 hover:bg-black/40 px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20 flex-1 text-xs">
                    <FaGooglePlay className="w-4 h-4" />
                    <div className="text-left">
                      <p className="text-green-200">Get it on</p>
                      <p className="font-semibold">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center space-x-2">
                <FaSeedling className="w-4 h-4 text-green-400" />
                <span>Market Tools</span>
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-green-200 hover:text-white transition-all duration-300 flex items-center space-x-2 group text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center space-x-2">
                <RiCustomerService2Fill className="w-4 h-4 text-green-400" />
                <span>Support</span>
              </h4>
              <ul className="space-y-2">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-green-200 hover:text-white transition-all duration-300 flex items-center space-x-2 group text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center space-x-2">
                <FaShieldAlt className="w-4 h-4 text-green-400" />
                <span>Company</span>
              </h4>
              <ul className="space-y-2">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-green-200 hover:text-white transition-all duration-300 flex items-center space-x-2 group text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base font-semibold mb-4 flex items-center space-x-2">
                <RiPhoneFill className="w-4 h-4 text-green-400" />
                <span>Contact</span>
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 group">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-500/30 transition-colors duration-300">
                    <FaMapMarkerAlt className="w-3 h-3 text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-green-200 text-xs">Kigali, Rwanda</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 group">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-500/30 transition-colors duration-300">
                    <FaPhone className="w-3 h-3 text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Call Us</p>
                    <p className="text-green-200 text-xs">+250 788 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 group">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-0.5 group-hover:bg-green-500/30 transition-colors duration-300">
                    <FaEnvelope className="w-3 h-3 text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Email Us</p>
                    <p className="text-green-200 text-xs">info@farmconnect.rw</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Made More Compact */}
        <div className="border-t border-green-700/50">
          <div className="container mx-auto px-4 lg:px-6 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-green-200 text-xs text-center sm:text-left">
                <p>© 2024 FarmConnect Rwanda. All rights reserved.</p>
                <div className="flex items-center space-x-1">
                  <FaHeadset className="w-3 h-3 text-green-400" />
                  <span>24/7 Farmer Support</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-300 hover:underline">
                  Privacy
                </a>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-300 hover:underline">
                  Terms
                </a>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-300 hover:underline">
                  Cookies
                </a>
                <a href="#" className="text-green-200 hover:text-white transition-colors duration-300 hover:underline">
                  Security
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;