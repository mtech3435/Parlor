import React, { useState, useEffect } from 'react';
import { MapPin, Square, Phone, Mail, Heart, Eye, Building } from 'lucide-react';
import { supabase, CommercialProperty } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PropertyGridProps {
  limit?: number;
  featured?: boolean;
}

export default function PropertyGrid({ limit, featured }: PropertyGridProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<CommercialProperty[]>([]);
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
    if (user) {
      fetchSavedProperties();
    }
  }, [limit, featured]);

  const fetchSavedProperties = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_saved_properties')
        .select('property_id')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const savedIds = new Set(data?.map(item => item.property_id) || []);
      setSavedProperties(savedIds);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    }
  };

  const toggleSaveProperty = async (propertyId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (savedProperties.has(propertyId)) {
        // Remove from saved
        const { error } = await supabase
          .from('user_saved_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);

        if (error) throw error;
        
        setSavedProperties(prev => {
          const newSet = new Set(prev);
          newSet.delete(propertyId);
          return newSet;
        });
      } else {
        // Add to saved
        const { error } = await supabase
          .from('user_saved_properties')
          .insert([{
            user_id: user.id,
            property_id: propertyId
          }]);

        if (error) throw error;
        
        setSavedProperties(prev => new Set([...prev, propertyId]));
      }
    } catch (error) {
      console.error('Error toggling saved property:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('commercial_properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (featured) {
        query = query.eq('featured', true);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Supabase error:', fetchError);
        throw new Error(`Database error: ${fetchError.message}`);
      }

      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getLeaseTypeLabel = (leaseType: string) => {
    switch (leaseType) {
      case 'sale': return 'For Sale';
      case 'rent': return 'For Rent';
      case 'both': return 'Sale/Rent';
      default: return leaseType;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(limit || 6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Properties</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProperties}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Properties Found</h3>
          <p className="text-gray-600">
            {featured ? 'No featured properties available at the moment.' : 'No properties available at the moment.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Square className="w-16 h-16 text-blue-400" />
              </div>
            )}
            {property.featured && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </div>
            )}
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {getLeaseTypeLabel(property.lease_type)}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {property.title}
            </h3>
            
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area}</span>
              </div>
              {property.parking_spaces > 0 && (
                <div className="flex items-center">
                  <span className="mr-1">🚗</span>
                  <span>{property.parking_spaces} parking</span>
                </div>
              )}
            </div>

            {property.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {property.description}
              </p>
            )}

            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 w-full">
                <button
                  onClick={() => toggleSaveProperty(property.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    savedProperties.has(property.id)
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${savedProperties.has(property.id) ? 'fill-current' : ''}`} />
                </button>
                
                <button 
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
            
            {property.contact_person && (
              <div className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                <div className="font-medium">{property.contact_person}</div>
                {property.contact_phone && (
                  <div className="flex items-center mt-1">
                    <Phone className="w-3 h-3 mr-1" />
                    <span>{property.contact_phone}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}