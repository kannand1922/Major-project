import axiosInstance from "../axiosInstance/index"; // Adjust the path as necessary

// Fetch the category list
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get(`/admin/fetch-category-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (name, data) => {
  try {
    console.log(data, "TEST");
    const response = await axiosInstance.post(`/admin/create-table/${name}`, { data });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Get category columns
export const getCategoryColumns = async (tableName) => {
  try {
    const response = await axiosInstance.get(`/admin/${tableName}/columns`);
    return response.data.columns;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (tableName) => {
  try {
    await axiosInstance.delete(`/admin/${tableName}/category`);
    alert(`Category ${tableName} deleted successfully`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// Add a column to a table
export const addColumn = async (tableName, columnData) => {
  try {
    await axiosInstance.post(`/admin/add-column`, {
      tableName,
      ...columnData,
    });
    alert("Column added successfully");
  } catch (error) {
    console.error("Error adding column:", error);
    throw error;
  }
};
