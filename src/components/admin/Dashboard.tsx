import React, { useState, useEffect } from 'react';
import { Building, Users, DollarSign, TrendingUp, Eye, Plus, Star, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalLeads: 0,
    featuredProperties: 0,
    newLeadsToday: 0,
    availableProperties: 0,
    leasedProperties: 0
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch properties count
      const { count: propertiesCount } = await supabase
        .from('commercial_properties')
        .select('*', { count: 'exact', head: true });

      // Fetch featured properties count
      const { count: featuredCount } = await supabase
        .from('commercial_properties')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true);

      // Fetch available properties count
      const { count: availableCount } = await supabase
        .from('commercial_properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'available');

      // Fetch leased properties count
      const { count: leasedCount } = await supabase
        .from('commercial_properties')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'leased');

      // Fetch leads count
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Fetch today's leads
      const today = new Date().toISOString().split('T')[0];
      const { count: todayLeadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      // Fetch recent leads
      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch recent properties
      const { data: properties } = await supabase
        .from('commercial_properties')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      setStats({
        totalProperties: propertiesCount || 0,
        totalLeads: leadsCount || 0,
        featuredProperties: featuredCount || 0,
        newLeadsToday: todayLeadsCount || 0,
        availableProperties: availableCount || 0,
        leasedProperties: leasedCount || 0
      });

      setRecentLeads(leads || []);
      setRecentProperties(properties || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Building,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Available Properties',
      value: stats.availableProperties,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'New Leads Today',
      value: stats.newLeadsToday,
      icon: Plus,
      color: 'bg-orange-500',
      change: '+3'
    }
  ];

  const formatPrice = (price: number, leaseType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    if (leaseType === 'rent') return `${formatted}/month`;
    if (leaseType === 'sale') return formatted;
    return formatted;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
          </div>
          <div className="p-6">
            {recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-sm text-gray-500">{lead.subject}</p>
                      {lead.inquiry_type && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mt-1">
                          {lead.inquiry_type.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        lead.status === 'new' ? 'bg-green-100 text-green-800' :
                        lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No leads yet</p>
            )}
          </div>
        </div>

        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Properties</h3>
          </div>
          <div className="p-6">
            {recentProperties.length > 0 ? (
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div key={property.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Building className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 truncate">{property.title}</p>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{property.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {property.featured && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </span>
                            )}
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              property.status === 'available' ? 'bg-green-100 text-green-800' :
                              property.status === 'leased' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {property.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-500">
                            {formatPrice(property.price, property.lease_type)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(property.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No properties yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 group">
              <div className="text-center">
                <Building className="w-8 h-8 text-red-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-gray-900">Add New Property</span>
                <p className="text-sm text-gray-600 mt-1">List a new commercial property</p>
              </div>
            </button>
            
            <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 group">
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-gray-900">View All Leads</span>
                <p className="text-sm text-gray-600 mt-1">Manage customer inquiries</p>
              </div>
            </button>
            
            <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 group">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-gray-900">Analytics Report</span>
                <p className="text-sm text-gray-600 mt-1">View performance metrics</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;