import React, { useState } from 'react';
import { Menu, X, User, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Home</a>
            <a href="/properties" className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Properties</a>
            <a href="/about" className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.email}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a
                      href="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Dashboard
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/login"
                  className="text-gray-600 hover:text-red-500 transition-colors duration-300 font-medium"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-red-500 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#home" className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Home</a>
            <a href="/properties" className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Properties</a>
            <a href="/about" className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">About</a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Contact</a>
            
            {user ? (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <a href="/account" className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">My Dashboard</a>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-500 transition-colors duration-300 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                <a href="/login" className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium">Sign In</a>
                <a href="/signup" className="block py-2 bg-red-500 text-white rounded-lg text-center hover:bg-red-600 transition-colors duration-300 font-medium">Sign Up</a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;