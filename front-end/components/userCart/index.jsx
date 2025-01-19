import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { fetchCartItems, updateCartItem, orderPayment, verifyPayment, createOrder, fetchAddresses } from "../../api/user/index.js";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [shake, setShake] = useState('');

  const navigate = useRouter();
  const user_id = localStorage.getItem("userId");

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetchCartItems();
      setCartItems(response.cartItems);
      setTotalPrice(response.totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartAction = async (categoryId, productId, action) => {
    setShake('shake');
    setTimeout(() => setShake(''), 500);
    try {
      setLoading(true);
      await updateCartItem({ categoryId, productId, action });
      getCartItems();
    } catch (error) {
      console.error(`Error updating cart with action ${action}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const addressResponse = await fetchAddresses(user_id);
      if (!addressResponse.addressId) {
        navigate.push("/address");
      } else {
        const price = totalPrice;
        const response = await orderPayment(price);
        initPayment(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const initPayment = (data) => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: "rzp_test_lxRT5NF1Dopxfd",
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: "Aparna Tex",
          description: "E-commerce",
          handler: async (res) => {
            try {
              const data = await verifyPayment(res);
              if (data) handleCreateOrder();
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "green",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
      };
      document.body.appendChild(script);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        user_id,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          category_id: item.category_id,
          quantity: item.count,
          price: item.price
        })),
        total_price: totalPrice,
      };

      const response = await createOrder(orderData);
      if (response.orderId) {
        console.log("Order created successfully!");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8 animate-bounce">
          <ShoppingCart className="w-8 h-8 mr-2 text-indigo-600" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Cart
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item, index) => {
              const total = item.price ? item.price * item.count : 0;
              return (
                <div
                  key={`${item.category_id}-${item.product_id}`}
                  className={`bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                    shake === 'shake' ? 'animate-[shake_0.5s_ease-in-out]' : ''
                  } ${index === 0 ? 'animate-[slideDown_0.5s_ease-out]' : ''}`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold hover:text-indigo-600 transition-colors">
                        {item.product_name}
                      </h2>
                      <p className="text-gray-600">Category: {item.category_name}</p>
                      <p className="text-indigo-600 font-medium">₹{item.price}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleCartAction(item.category_id, item.product_id, 'REMOVE')}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors group"
                      >
                        <Minus className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                      </button>
                      
                      <span className="w-8 text-center font-medium">{item.count}</span>
                      
                      <button
                        onClick={() => handleCartAction(item.category_id, item.product_id, 'ADD')}
                        className="p-2 rounded-full hover:bg-green-100 transition-colors group"
                      >
                        <Plus className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    <div className="text-right flex-grow">
                      <p className="text-lg font-semibold text-indigo-600">
                        Total: ₹{total}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 animate-[fadeIn_1s_ease-in]">
            <p className="text-gray-600 text-lg">Your cart is empty</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 space-y-4 animate-[slideUp_0.5s_ease-out]">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 text-white">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total Amount</span>
                <span className="text-2xl font-bold">₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-medium transform transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paymentLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Proceed to Payment</span>
              )}
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
