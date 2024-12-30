import axios from "axios";

const API_URL = "http://localhost:4000";  // Your server URL

// Fetch the category list
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/fetch-category-list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Create a new category
export const createCategory = async (name,data) => {
  try {
    console.log(data,"TEST")
    const response = await axios.post(`${API_URL}/admin/create-table/${name}`, { data });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

export const getCategoryColumns = async (tableName) => {
    try {
      const response = await axios.get(`${API_URL}/admin/${tableName}/columns`);
      return response.data.columns;
    } catch (error) {
      console.error("Error fetching columns:", error);
      throw error;
    }
  };
  export const deleteCategory = async (tableName) => {
    try {
      await axios.delete(`${API_URL}/admin/${tableName}/category`);
      alert(`Category ${tableName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  
  // Add a column to a table
  export const addColumn = async (tableName, columnData) => {
    try {
      await axios.post(`${API_URL}/admin/add-column`, {
        tableName,
        ...columnData,
      });
      alert("Column added successfully");
    } catch (error) {
      console.error("Error adding column:", error);
    }
  }