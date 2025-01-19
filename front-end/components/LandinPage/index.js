import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Package, Home, MapPin, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '../Navbar';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    { name: 'Premium PVC', description: 'High-grade materials built to last', color: 'bg-blue-500' },
    { name: 'Elite Paints', description: 'Superior finish, lasting beauty', color: 'bg-purple-500' },
    { name: 'Pro Hardware', description: 'Professional-grade tools', color: 'bg-green-500' },
    { name: 'Building Essentials', description: 'Quality construction supplies', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Navbar */}
  <Navbar/>

      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Trade Excellence
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center"
            >
              <p className="text-xl md:text-2xl mb-8">Discover premium trading solutions</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center space-x-2"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Products Section */}
      <div className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className={`${product.color} aspect-square rounded-2xl p-8 transition-all duration-500 group-hover:scale-110`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="h-full w-full flex flex-col justify-end"
                  >
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-sm opacity-80">{product.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Feature Section */}
      <motion.div 
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Experience Excellence
              </motion.h2>
              <motion.p
                className="text-xl mb-8 text-gray-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Discover our premium selection of trading materials, built with quality and precision.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold"
              >
                Learn More
              </motion.button>
            </div>
            <motion.div
              className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl"
              animate={{
                rotate: [0, 90, 180, 270, 360],
                borderRadius: ["20%", "30%", "20%", "30%", "20%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-black to-blue-900"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            Get in Touch
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold"
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
