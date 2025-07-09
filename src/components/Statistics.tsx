import React, { useState, useEffect } from 'react';
import { TrendingUp, Building, Users, Award, MapPin, DollarSign } from 'lucide-react';

const Statistics: React.FC = () => {
  const [counts, setCounts] = useState({
    properties: 0,
    clients: 0,
    sales: 0,
    locations: 0
  });

  const targetCounts = {
    properties: 500,
    clients: 1200,
    sales: 850,
    locations: 50
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    const counters = Object.keys(targetCounts).map(key => {
      const target = targetCounts[key as keyof typeof targetCounts];
      const increment = target / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counters[Object.keys(targetCounts).indexOf(key)]);
        }
        setCounts(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepTime);
    });

    return () => {
      counters.forEach(clearInterval);
    };
  }, []);

  const stats = [
    {
      icon: <Building className="w-8 h-8" />,
      count: counts.properties,
      label: 'Commercial Properties',
      color: 'text-blue-500',
      suffix: '+'
    },
    {
      icon: <Users className="w-8 h-8" />,
      count: counts.clients,
      label: 'Satisfied Clients',
      color: 'text-green-500',
      suffix: '+'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      count: counts.sales,
      label: 'Successful Deals',
      color: 'text-purple-500',
      suffix: '+'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      count: counts.locations,
      label: 'Prime Locations',
      color: 'text-red-500',
      suffix: '+'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Over 15 years of excellence in commercial real estate, serving businesses across the region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.count.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">$2.5B+</h3>
            <p className="text-gray-300">Total Transaction Value</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">25+</h3>
            <p className="text-gray-300">Industry Awards</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Building className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">98%</h3>
            <p className="text-gray-300">Client Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;