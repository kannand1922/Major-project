"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import {fetchOrders} from "../../api/product/productApi"
const AdminDashboard = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetchOrders();
        setOrderDetails(response.orders);
        processData(response.orders);
      } catch (error) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const processData = (orders) => {
    const monthlyStats = {};
    const customers = new Set();

    orders.forEach(order => {
      const date = new Date(order.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthKey,
          revenue: 0,
          orders: 0,
          items: 0
        };
      }
      
      monthlyStats[monthKey].revenue += order.total_price;
      monthlyStats[monthKey].orders += 1;
      monthlyStats[monthKey].items += order.items.reduce((sum, item) => sum + item.quantity, 0);
      
      customers.add(order.email);
    });

    const monthlyDataArray = Object.values(monthlyStats).sort((a, b) => a.month.localeCompare(b.month));
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
    
    setMonthlyData(monthlyDataArray);
    setMetrics({
      totalRevenue,
      totalOrders: orders.length,
      averageOrderValue: totalRevenue / orders.length,
      totalCustomers: customers.size
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-10 mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <Typography variant="h4" className="mb-8 font-bold text-gray-800">
          Sales Analytics Dashboard
        </Typography>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card elevation={2}>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <Typography color="textSecondary" variant="subtitle2">
                    Total Revenue
                  </Typography>
                  <Typography variant="h5" component="div">
                    ₹{metrics.totalRevenue.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <Typography color="textSecondary" variant="subtitle2">
                    Total Orders
                  </Typography>
                  <Typography variant="h5" component="div">
                    {metrics.totalOrders}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <Typography color="textSecondary" variant="subtitle2">
                    Avg. Order Value
                  </Typography>
                  <Typography variant="h5" component="div">
                    ₹{metrics.averageOrderValue.toFixed(2)}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <Typography color="textSecondary" variant="subtitle2">
                    Total Customers
                  </Typography>
                  <Typography variant="h5" component="div">
                    {metrics.totalCustomers}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue Trend
              </Typography>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Orders and Items */}
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Orders & Items
              </Typography>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8b5cf6" name="Orders" />
                    <Bar dataKey="items" fill="#60a5fa" name="Items" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;