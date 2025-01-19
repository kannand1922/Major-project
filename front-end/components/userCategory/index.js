'use client';
import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../api/product/categoryApi";
import { useRouter } from "next/navigation";
import { Layers } from "lucide-react";

const UserCategoryList = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-red-500 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header with floating animation */}
        <div className="flex items-center justify-center mb-12 animate-float">
          <Layers className="w-10 h-10 text-white mr-3" />
          <h1 className="text-4xl font-bold text-white">Categories</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin" />
              <div className="absolute top-2 left-2 w-16 h-16 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-slow" />
            </div>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => router.push(`/userProduct?categoryName=${category.name}`)}
                className={`
                  bg-white rounded-xl p-6 cursor-pointer
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-2xl
                  group relative overflow-hidden
                  animate-[slideUp_0.5s_ease-out_${index * 0.1}s]
                `}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-red-500/0 group-hover:from-purple-500/10 group-hover:to-red-500/10 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 text-center">
                    {category.name}
                  </h2>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center animate-fadeIn">
            <p className="text-xl text-white">No categories found.</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slideUp {
          from { 
            transform: translateY(50px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UserCategoryList;
