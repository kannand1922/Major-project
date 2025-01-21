import React, { useState } from 'react';
import { 
  Lightbulb, 
  PaintBucket, 
  Cable, 
  Power, 
  SwitchCamera, 
  Phone,
  Clock,
  ChevronDown,
  Router,
  Fan,
  Wrench
} from 'lucide-react';

const LandingPage = () => {
  const productCategories = [
    {
      name: 'Electrical Accessories',
      description: 'High-quality switches, sockets & more',
      icon: <Power className="w-8 h-8" />,
      color: 'bg-blue-500',
      items: ['Modular Switches', 'Sockets', 'MCBs', 'Distribution Boxes']
    },
    {
      name: 'Premium Paints',
      description: 'Interior & exterior wall paints',
      icon: <PaintBucket className="w-8 h-8" />,
      color: 'bg-purple-500',
      items: ['Interior Emulsion', 'Exterior Paints', 'Primers', 'Waterproofing']
    },
    {
      name: 'Pipes & Fittings',
      description: 'PVC & electrical conduit pipes',
      icon: <Cable className="w-8 h-8" />,
      color: 'bg-green-500',
      items: ['PVC Pipes', 'Electrical Conduits', 'Pipe Fittings', 'Accessories']
    },
    {
      name: 'Lighting Solutions',
      description: 'LED lights & decorative fixtures',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'bg-amber-500',
      items: ['LED Bulbs', 'Panel Lights', 'Decorative Lights', 'Outdoor Lights']
    }
  ];

  const popularProducts = [
    {
      name: 'Premium LED Bulbs',
      description: '9W & 12W Energy Saving',
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      name: 'Modular Switches',
      description: 'Modern Design Series',
      icon: <SwitchCamera className="w-6 h-6" />
    },
    {
      name: 'Weather-Proof Paint',
      description: 'Long-lasting Protection',
      icon: <PaintBucket className="w-6 h-6" />
    },
    {
      name: 'Heavy-Duty PVC',
      description: 'ISI Marked Pipes',
      icon: <Cable className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Siva Electricals
            </h1>
            <p className="text-xl md:text-2xl mb-4">Your Complete Electrical & Hardware Solution</p>
            <p className="text-lg md:text-xl mb-8 text-gray-200">Premium Electrical Accessories • Quality Paints • PVC Pipes</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
                <span>Contact Us</span>
              </button>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
                <span>View Products</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </div>

      {/* Product Categories */}
      <div className="py-20 px-4 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">Our Product Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCategories.map((category, index) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl hover:scale-105 transition-transform"
              >
                <div className={`${category.color} aspect-square rounded-2xl p-8 transition-all duration-500`}>
                  <div className="h-full w-full flex flex-col items-center justify-center text-center">
                    {category.icon}
                    <h3 className="text-2xl font-bold mt-4 mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                    <ul className="text-sm space-y-1">
                      {category.items.map((item, i) => (
                        <li key={i} className="opacity-90">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, index) => (
              <div key={product.name} className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-400">All products are ISI marked and quality assured</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Router className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-400">Professional advice for all your requirements</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fan className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Competitive Prices</h3>
              <p className="text-gray-400">Best prices for wholesale and retail customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Visit Our Store
          </h2>
          <p className="text-xl mb-8">Experience our wide range of products in person</p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:scale-105 transition-transform">
            <Phone className="w-5 h-5" />
            <span>Contact Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;