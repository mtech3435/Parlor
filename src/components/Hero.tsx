import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [leaseType, setLeaseType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to properties page with filters
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (propertyType) params.set('type', propertyType);
    if (priceRange) params.set('price', priceRange);
    if (leaseType) params.set('lease', leaseType);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <img 
          src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Modern commercial building"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Premium Commercial
            <span className="block text-red-500">Real Estate</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover exceptional commercial properties for your business. From modern offices to prime retail spaces.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
            <div className="text-gray-300 text-sm">Properties</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
            <div className="text-gray-300 text-sm">Years Experience</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
            <div className="text-gray-300 text-sm">Happy Clients</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
            <div className="text-gray-300 text-sm">Locations</div>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto border border-white/20">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Commercial Space</h3>
              <p className="text-gray-600">Search through our extensive portfolio of premium commercial properties</p>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Location or Area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Property Type */}
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none transition-all duration-300"
                >
                  <option value="">Property Type</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="plaza">Plaza</option>
                  <option value="retail">Retail Space</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              {/* Lease Type */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={leaseType}
                  onChange={(e) => setLeaseType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none transition-all duration-300"
                >
                  <option value="">Sale or Rent</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="both">Both</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Search className="w-5 h-5" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#properties"
            className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#contact"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2 font-medium border border-white/30"
          >
            <span>Get Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;