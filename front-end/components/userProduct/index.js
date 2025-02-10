'use client';
import React, { useEffect, useState } from "react";
import { updateCartItem, fetchProducts } from "../../api/user";
import { Package, Plus, Minus, ShoppingCart } from "lucide-react";
import { useAlert } from "../../src/app/context/alert/index.js";
const UserProductList = ({ categoryName }) => {
  const { showAlert } = useAlert();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getProducts();
  }, [categoryName]);

  const getProducts = async () => {
    setLoading(true);
    const productList = await fetchProducts(categoryName);
    setProducts(productList);
    setLoading(false);
  };

  const handleCartAction = async (productId, action) => {
    try {
      setLoading(true);
      const categoryId = products.categoryId;
      await updateCartItem({ categoryId, productId, action });
      showAlert("cart updated successfully")
      getProducts();
    } catch (error) {
      console.error(`Error performing ${action} on cart:`, error);
      showAlert(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-red-500 pt-32">
      <div className="max-w-7xl w-full text-center">
        <div className="flex items-center justify-center mb-12">
          <Package className="w-10 h-10 text-white mr-3" />
          <h1 className="text-4xl font-bold text-white ">
            {categoryName} Products
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <div className="absolute top-1 left-1 w-14 h-14 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-reverse" />
            </div>
          </div>
        ) : products?.data?.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-10">
            {products?.data?.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative ${
                  isClient ? `animate-slideUp_${index * 0.1}s` : ''
                }`}
                onMouseEnter={() => setActiveCard(product.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative ">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{width:"300px",height:"300px"}}
                    className="w-100 h-200 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {product.name}
                  </h2>
                  <div className="space-y-2">
                    {Object.entries(product).map(
                      ([key, value]) =>
                        key !== "image_url" && key !== "name" && (
                          <div
                            key={key}
                            className="flex justify-between items-center text-gray-600"
                          >
                            <span className="font-medium capitalize">
                              {key}:
                            </span>
                            <span>{value}</span>
                          </div>
                        )
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleCartAction(product.id, "REMOVE")}
                      className="p-2 rounded-full hover:bg-red-100 transition-colors group/btn"
                    >
                      <Minus className="w-5 h-5 text-red-500 group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <ShoppingCart
                      className={`w-6 h-6 text-purple-500 transition-all duration-300 ${
                        activeCard === product.id ? "animate-bounce" : ""
                      }`}
                    />
                    <button
                      onClick={() => handleCartAction(product.id, "ADD")}
                      className="p-2 rounded-full hover:bg-green-100 transition-colors group/btn"
                    >
                      <Plus className="w-5 h-5 text-green-500 group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col justify-center items-center h-64">
            <p className="text-xl text-white">
              No products found in {categoryName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProductList;
