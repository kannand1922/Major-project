"use client";
import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../../api/product/productApi";
import { Download, Package, User, MapPin, ShoppingBag } from "lucide-react";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Access localStorage inside useEffect
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetchOrders();
        setOrderDetails(response.orders);
      } catch (error) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrderDetails();
    }
  }, [userId]);

  const downloadInvoice = (order) => {
    const invoiceData = `
      Order ID: ${order.order_id}
      Name: ${order.name}
      Email: ${order.email}
      Phone: ${order.phone}
      Address: ${order.address_line}, ${order.city}, ${order.state}, ${
      order.pincode
    }
      Total Price: ₹${order.total_price}
      Order Date: ${new Date(order.created_at).toLocaleString()}
      Items:
      ${order.items
        .map(
          (item) => `
        Product Name: ${item.productDetails.name}
        Quantity: ${item.quantity}
        Total Price: ₹${item.total_price}
      `
        )
        .join("\n")}
    `;

    const blob = new Blob([invoiceData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Invoice_Order_${order.order_id}.txt`;
    link.click();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <div className="absolute top-1 left-1 w-14 h-14 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin-reverse" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center p-4 animate-fadeIn">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8" style={{padding:"130px"}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-12 animate-float">
          <ShoppingBag className="w-10 h-10 text-purple-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Order Details</h1>
        </div>

        {/* Order List */}
        <div className="space-y-6">
          {orderDetails.map((order, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden
                transform transition-all duration-300
                hover:shadow-xl
                animate-[slideUp_0.5s_ease-out_${index * 0.1}s]
              `}
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Package className="w-6 h-6 text-white" />
                  <h2 className="text-lg font-semibold text-white">
                    Order #{order.order_id}
                  </h2>
                </div>
                <button
                  onClick={() => downloadInvoice(order)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors group"
                >
                  <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Order Content */}
              <div className="p-6 space-y-6">
                {/* Order Summary */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    <span className="font-semibold">Order Date:</span>
                    <br />
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{order.total_price}
                  </p>
                </div>

                {/* User Info Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <User className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">Customer Details</h3>
                  </div>
                  <div className="flex items-center space-x-6 pl-8">
                    <p className="text-sm md:text-base">
                      <span className="font-medium">Name:</span> {order.name}
                    </p>
                    <p className="text-sm md:text-base">
                      <span className="font-medium">Email:</span> {order.email}
                    </p>
                    <p className="text-sm md:text-base">
                      <span className="font-medium">Phone:</span> {order.phone}
                    </p>
                  </div>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-5 h-5" />
                    <h3 className="font-semibold">Delivery Address</h3>
                  </div>
                  <div className="pl-7 space-y-2">
                    <p>{order.address_line}</p>
                    <p>
                      {order.city}, {order.state} - {order.pincode}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Package className="w-5 h-5" />
                    <h3 className="font-semibold">Order Items</h3>
                  </div>
                  <div className="grid gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src={item.productDetails.image_url}
                          alt={item.productDetails.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {item.productDetails.name}
                          </h4>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-purple-600 font-medium">
                            ₹{item.total_price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
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

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;
