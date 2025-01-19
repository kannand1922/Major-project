import axiosInstance from "../axiosInstance/index"; // Adjust the path as necessary

// Fetch products for a specific category
export const fetchProducts = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/admin/fetch-products/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};



// Add a new product to a category
export const addProduct = async (categoryName, productData) => {
  try {
    const response = await axiosInstance.post(`/admin/insert-data/${categoryName}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (categoryName, productId) => {
  try {
    const response = await axiosInstance.get(`/admin/fetch-product/${categoryName}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Update a product by ID
export const updateProductById = async (categoryName, productId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/admin/update-product/${categoryName}/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product by ID:", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (categoryName, productId) => {
  try {
    const response = await axiosInstance.delete(`/admin/delete-product/${categoryName}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
