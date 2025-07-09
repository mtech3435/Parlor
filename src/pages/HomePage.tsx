import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import PropertyGrid from '../components/PropertyGrid';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PropertyGrid />
      <Statistics />
      <Testimonials />
      <ContactForm />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;