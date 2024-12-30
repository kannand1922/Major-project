import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { fetchCategories, deleteCategory } from "../../api/product/categoryApi"; // Import new delete API
import CategoryForm from "../categoryForm.js";
import "./category.css";
import { useRouter } from "next/navigation";
const CategoryList = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category for updating

  useEffect(() => {
    getCategories();
  }, [openForm]);

  const getCategories = async () => {
    setLoading(true);
    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
    setLoading(false);
  };

  const handleCreateCategory = () => setOpenForm(true);

  const handleDeleteCategory = async (categoryName) => {
    await deleteCategory(categoryName); // Call delete API
    getCategories();
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setOpenForm(true);
  };

  return (
    <div className="category-list-container">
      <button className="create-category-btn" onClick={handleCreateCategory}>
        Create Category
      </button>

      {openForm && (
        <CategoryForm
          onClose={() => setOpenForm(false)}
          category={selectedCategory}
        />
      )}

      {loading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
      ) : categories.length > 0 ? (
        <div className="category-list">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div
                className="category-name"
                onClick={() =>
                  router.push(`/products?categoryName=${category.name}`)
                }
              >
                {category.name}
              </div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdateCategory(category)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteCategory(category.name)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-message">No categories found.</div>
      )}
    </div>
  );
};

export default CategoryList;
