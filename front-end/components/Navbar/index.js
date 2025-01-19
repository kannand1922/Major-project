"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleNavigation = (item) => {
    if (item === 'Products') {
      if (role === 'admin') {
        router.push('/category');  
      } else {
        router.push('/userCategory');  
      }
    } else if (item === 'Cart') {
      router.push('/userCart');  
    } 
    else if (item === 'Order') {
      router.push('/userOrder');  
    } 
    else {
      router.push(`/`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-[9999] bg-black/80 backdrop-blur-lg text-white !important"
      style={{ marginBottom: '1rem' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TradeHub
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {['Home', 'Products', 'Cart', 'Order'].map((item, index) => {
              if (role === 'admin' && (item === 'Products' || item === 'Cart')) {
                return null;
              }

              return (
                <motion.a
                  key={item}
                  href="#"
                  className="relative !text-white"
                  whileHover={{ scale: 1.1 }}
                  onHoverStart={() => setActiveSection(index)}
                  onClick={(e) => {
                    e.preventDefault();  // Prevent the default anchor click behavior
                    handleNavigation(item);
                  }}
                >
                  {item}
                  {activeSection === index && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
