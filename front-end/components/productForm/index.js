import React, { useState } from "react";
import { Modal, Box, TextField, Button, CircularProgress } from "@mui/material";
import { addProduct } from "../../api/product/productApi"; // Adjust this import if necessary

const ProductForm = ({ categoryName, onClose, columns }) => {
  const [productData, setProductData] = useState({});
  const [image, setImage] = useState(null); // State for the image

  const handleInputChange = (name, value) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image file
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // formData.append("categoryName", categoryName);

    // Append product data
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    // Append image file
    if (image) {
      formData.append("image", image);
    }

    // Send the form data to the API
    await addProduct(categoryName,formData);
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: "white", margin: "auto", maxWidth: 400 }}>
        <h2>Add Product</h2>

        {/* Dynamically render fields based on columns */}
        {columns.length === 0 ? (
          <CircularProgress />
        ) : (
          columns.map((column) => (
            <TextField
              key={column.Field}
              label={column.Field}
              fullWidth
              value={productData[column.Field] || ""}
              onChange={(e) => handleInputChange(column.Field, e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          ))
        )}

        {/* Image Upload Field */}
        <TextField
          type="file"
          fullWidth
          onChange={handleImageChange}
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Product
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductForm;
