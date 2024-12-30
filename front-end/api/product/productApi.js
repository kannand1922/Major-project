import axios from "axios";

const API_URL = "http://localhost:4000";  // Your server URL

// Fetch products for a specific category
export const fetchProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/fetch-products/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Add a new product to a categor
export const addProduct = async (categoryName, productData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/insert-data/${categoryName}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Fetch a single product by ID
export const fetchProductById = async (categoryName, productId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/fetch-product/${categoryName}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
  }
};

// Update a product by ID
export const updateProductById = async (categoryName, productId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/update-product/${categoryName}/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product by ID:", error);
  }
};

export const deleteProduct = async (categoryName, productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/delete-product/${categoryName}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};