import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { fetchCategories, deleteCategory } from "../../api/product/categoryApi";
import CategoryForm from "../categoryForm.js";
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    await deleteCategory(categoryName);
    getCategories();
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setOpenForm(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        minHeight: "100vh",
        background: "linear-gradient(to right, #7b4397, #dc2430)",
      }}
    >
      <Button
        onClick={handleCreateCategory}
        sx={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#45a049" },
        }}
      >
        Create Category
      </Button>

      {openForm && (
        <CategoryForm
          onClose={() => setOpenForm(false)}
          category={selectedCategory}
        />
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : categories.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            marginTop: 3,
            justifyContent: "center",
          }}
        >
          {categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                width: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <Typography
                onClick={() =>
                  router.push(`/products?categoryName=${category.name}`)
                }
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { color: "#dc2430" },
                }}
              >
                {category.name}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#007bff",
                  color: "white",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
                onClick={() => handleUpdateCategory(category)}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
                onClick={() => handleDeleteCategory(category.name)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: 18,
            color: "white",
            textAlign: "center",
            marginTop: 2,
          }}
        >
          No categories found.
        </Typography>
      )}
    </Box>
  );
};

export default CategoryList;
