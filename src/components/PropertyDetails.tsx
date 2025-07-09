import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Square, 
  Calendar, 
  Phone, 
  Mail, 
  Star,
  Car,
  Wifi,
  Coffee,
  Shield,
  Zap,
  Users,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';
import { supabase, CommercialProperty } from '../lib/supabase';
import Header from './Header';
import Footer from './Footer';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<CommercialProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      const { data, error } = await supabase
        .from('commercial_properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
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

  const nextImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative">
              {property.images && property.images.length > 0 ? (
                <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {property.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.status === 'available' ? 'bg-green-500 text-white' :
                      property.status === 'leased' ? 'bg-blue-500 text-white' :
                      property.status === 'sold' ? 'bg-gray-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>

                  {property.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-96 lg:h-[500px] bg-gray-200 rounded-xl flex items-center justify-center">
                  <Building className="w-16 h-16 text-gray-400" />
                </div>
              )}

              {/* Thumbnail Gallery */}
              {property.images && property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Square className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">Area</div>
                </div>
                
                {property.parking_spaces > 0 && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Car className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{property.parking_spaces}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                )}
                
                {property.floor_number && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Building className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Floor {property.floor_number}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                )}
                
                {property.year_built && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{property.year_built}</div>
                    <div className="text-sm text-gray-600">Built</div>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {formatPrice(property.price, property.lease_type)}
                </div>
                <div className="text-gray-600 mb-4">
                  {property.lease_type === 'sale' ? 'For Sale' : 
                   property.lease_type === 'rent' ? 'For Rent' : 
                   'Sale or Rent'}
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium">
                    Schedule Viewing
                  </button>
                  <button 
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="w-full bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors duration-300 font-medium"
                  >
                    Contact Agent
                  </button>
                  <div className="flex space-x-2">
                    <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Save
                    </button>
                    <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center">
                      <Share2 className="w-5 h-5 mr-2" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                {(property.contact_person || property.contact_phone) && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                    {property.contact_person && (
                      <div className="flex items-center space-x-2 text-gray-700 mb-2">
                        <Users className="w-4 h-4" />
                        <span>{property.contact_person}</span>
                      </div>
                    )}
                    {property.contact_phone && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <Phone className="w-4 h-4" />
                        <a 
                          href={`tel:${property.contact_phone}`}
                          className="hover:text-red-500 transition-colors duration-300"
                        >
                          {property.contact_phone}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Contact Form */}
              {showContactForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Inquiry</h4>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium"
                    >
                      Send Inquiry
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;