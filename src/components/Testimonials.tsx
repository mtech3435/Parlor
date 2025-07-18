import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Building } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'CEO, TechStart Inc.',
      company: 'Technology Startup',
      content: 'Parlor Real Estate helped us find the perfect office space for our growing tech company. Their understanding of our needs and the commercial market was exceptional.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      propertyType: 'Office Space'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Retail Manager',
      company: 'Fashion Forward',
      content: 'Finding the right retail location was crucial for our business. The team at Parlor Real Estate understood our foot traffic requirements and found us the perfect spot.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
      propertyType: 'Retail Shop'
    },
    {
      name: 'David Thompson',
      role: 'Operations Director',
      company: 'LogiFlow Solutions',
      content: 'We needed a large warehouse facility with specific logistics requirements. Parlor Real Estate delivered exactly what we needed, on time and within budget.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
      propertyType: 'Warehouse'
    },
    {
      name: 'Emily Johnson',
      role: 'Investment Manager',
      company: 'Capital Growth Partners',
      content: 'As commercial property investors, we rely on Parlor Real Estate for their market expertise and deal flow. They consistently deliver high-quality investment opportunities.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      propertyType: 'Investment Properties'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextTestimonial = () => {
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from business leaders who found their perfect commercial space with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <Quote className="w-12 h-12 text-red-500" />
              </div>
              
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Building className="w-4 h-4" />
                <span>{testimonials[currentIndex].propertyType}</span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-red-500" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-red-500" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-red-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-gray-600 text-sm">Properties Sold</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-gray-600 text-sm">Client Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-gray-600 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;