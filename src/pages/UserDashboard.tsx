import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  User, 
  Settings, 
  LogOut, 
  Trash2, 
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase, CommercialProperty, Lead } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface SavedProperty {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property: CommercialProperty;
}

const UserDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [inquiries, setInquiries] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch saved properties
      const { data: savedData, error: savedError } = await supabase
        .from('user_saved_properties')
        .select(`
          *,
          property:commercial_properties(*)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (savedError) throw savedError;
      setSavedProperties(savedData || []);

      // Fetch user inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (inquiriesError) throw inquiriesError;
      setInquiries(inquiriesData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedProperty = async (savedPropertyId: string) => {
    try {
      const { error } = await supabase
        .from('user_saved_properties')
        .delete()
        .eq('id', savedPropertyId);

      if (error) throw error;
      
      setSavedProperties(prev => prev.filter(sp => sp.id !== savedPropertyId));
    } catch (error) {
      console.error('Error removing saved property:', error);
    }
  };

  const formatPrice = (price: number, leaseType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    if (leaseType === 'rent') return `${formatted}/month`;
    if (leaseType === 'sale') return formatted;
    return `${formatted}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'qualified':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === 'saved'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Saved Properties ({savedProperties.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === 'inquiries'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>My Inquiries ({inquiries.length})</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Properties</h2>
                {savedProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProperties.map((savedProperty) => (
                      <div key={savedProperty.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48">
                          {savedProperty.property.images && savedProperty.property.images.length > 0 ? (
                            <img
                              src={savedProperty.property.images[0]}
                              alt={savedProperty.property.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <Building className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                          <button
                            onClick={() => removeSavedProperty(savedProperty.id)}
                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {savedProperty.property.title}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{savedProperty.property.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-red-500">
                              {formatPrice(savedProperty.property.price, savedProperty.property.lease_type)}
                            </span>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Saved on {new Date(savedProperty.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Properties</h3>
                    <p className="text-gray-600 mb-6">Start browsing properties and save your favorites here</p>
                    <a
                      href="/properties"
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Browse Properties
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Inquiries</h2>
                {inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{inquiry.subject}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(inquiry.created_at).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {inquiry.inquiry_type?.replace('_', ' ') || 'General'}
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{inquiry.message}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>{inquiry.email}</span>
                          </div>
                          {inquiry.phone && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>{inquiry.phone}</span>
                            </div>
                          )}
                          {inquiry.budget_range && (
                            <div className="flex items-center text-gray-600">
                              <span className="w-4 h-4 mr-2">💰</span>
                              <span>{inquiry.budget_range}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Inquiries Yet</h3>
                    <p className="text-gray-600 mb-6">Contact us about properties you're interested in</p>
                    <a
                      href="/#contact"
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Make an Inquiry
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;