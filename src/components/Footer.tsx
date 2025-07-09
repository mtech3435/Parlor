import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin as LinkedIn, Mail, Phone, MapPin, MessageCircle, Building } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo variant="full" size="md" className="filter brightness-0 invert" />
            <p className="text-gray-400 text-sm">
              Your premier partner in commercial real estate. We specialize in finding the perfect business spaces for growing companies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <LinkedIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#properties" className="text-gray-400 hover:text-white transition-colors duration-300">Properties</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors duration-300">Admin Portal</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Commercial Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"><Building className="w-4 h-4 mr-2" />Office Spaces</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"><Building className="w-4 h-4 mr-2" />Retail Shops</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"><Building className="w-4 h-4 mr-2" />Warehouses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"><Building className="w-4 h-4 mr-2" />Commercial Plazas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"><Building className="w-4 h-4 mr-2" />Investment Properties</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">280 Wilson Avenue Suite 3R</p>
                  <p className="text-gray-400 text-sm">Brooklyn, NY 11237</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <a href="tel:+13365089568" className="text-gray-400 hover:text-white transition-colors duration-300">
                  +1 (336) 508-9568
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500" />
                <a href="mailto:eric@parlorrealestate.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                  eric@parlorrealestate.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <a 
                  href="https://wa.me/13365089568?text=Hi, I'm interested in commercial properties" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  WhatsApp Business
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Parlor Real Estate. All rights reserved. Commercial Real Estate Specialists.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;