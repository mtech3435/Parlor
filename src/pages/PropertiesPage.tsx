import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyGrid from '../components/PropertyGrid';

const PropertiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Commercial Properties
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete portfolio of premium commercial real estate opportunities
          </p>
        </div>

        <PropertyGrid />
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesPage;