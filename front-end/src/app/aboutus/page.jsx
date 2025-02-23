"use client"

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  History,
  Award,
  Shield,
  Target,
  Building,
  ChevronRight
} from 'lucide-react';
import GoogleMapComponent from "../../../components/map/index"
const InfoPages = () => {
  const [activePage, setActivePage] = useState('about');

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91 98659 75838"],
      color: "bg-blue-500"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["sivaelectricalsnkdr@gmail.com"],
      color: "bg-purple-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["2/285, N.R.N.Complex Main Road, Nathakadaiyur, Tamil Nadu - 638108"],
      color: "bg-green-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 9:00 AM - 9:00 PM", "Sunday: Leave"],
      color: "bg-amber-500"
    }
  ];

  const milestones = [
    {
      year: "1998",
      title: "Founded",
      description: "Started as a small electrical shop in Nathakadaiyur"
    },
    {
      year: "2005",
      title: "Expansion",
      description: "Opened our first major shop with variety of products and accessories"
    },
    {
      year: "2015",
      title: "Growth",
      description: "Opened a new branch in Kangeyam"
    },
    {
      year: "2025",
      title: "Innovation",
      description: "Launched our premium product line and e-commerce platform"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "We ensure all our products meet the highest quality standards"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Customer Focus",
      description: "Dedicated to exceeding customer expectations"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "Committed to excellence in everything we do"
    }
  ];

  const renderContactPage = () => (
    <div className="py-20 px-4 bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Send us a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-slate-800 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-slate-800 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="bg-slate-800 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            rows={6}
            className="bg-slate-800 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold w-full hover:bg-blue-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const renderAboutPage = () => (
    <>
      {/* Company Overview */}
      <div className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <Building className="w-16 h-16 mx-auto mb-6 text-blue-500" />
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Siva Electricals has been a trusted name in the electrical and hardware industry for over 27 years. 
              What started as a small electrical shop has grown into one of the region's leading suppliers of 
              electrical accessories, premium paints, and quality hardware solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="text-blue-500 text-4xl font-bold mb-4">{milestone.year}</div>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-400">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 px-4 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-slate-900 rounded-xl">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <p className="text-xl mb-8">
            Our experienced team of professionals is dedicated to providing you with the best service and expert guidance.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold inline-flex items-center space-x-2 hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
            <span>Join Our Team</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderContactFooter = () => (
    <div className="bg-gradient-to-b from-slate-900 to-blue-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 hover:scale-105 transition-transform">
              <div className={`${info.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                {info.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-300 mb-2">{detail}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation Tabs */}
      <div className="bg-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActivePage('about')}
              className={`py-4 px-4 font-semibold relative ${
                activePage === 'about' ? 'text-blue-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              About Us
              {activePage === 'about' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
              )}
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className={`py-4 px-4 font-semibold relative ${
                activePage === 'contact' ? 'text-blue-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              Contact Us
              {activePage === 'contact' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {activePage === 'about' ? 'About Us' : 'Contact Us'}
          </h1>
          <p className="text-xl mb-4">
            {activePage === 'about' 
              ? 'Building Trust Through Quality Since 1998'
              : 'Get in touch with our expert team'}
          </p>
        </div>
      </div>

<div>
<GoogleMapComponent />
</div>
      {/* Page Content */}
      {activePage === 'about' ? renderAboutPage() : renderContactPage()}

      {/* Contact Footer */}
      {renderContactFooter()}
    </div>
  );
};

export default InfoPages;