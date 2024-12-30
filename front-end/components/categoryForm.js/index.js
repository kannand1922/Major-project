import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createCategory, addColumn } from "../../api/product/categoryApi"; // Import addColumn API

const CategoryForm = ({ onClose, category }) => {
  const [categoryName, setCategoryName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "" }]);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setColumns(category.columns || [{ name: "", type: "" }]); // Preload columns if category is selected for update
    }
  }, [category]);

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
  };



  const handleSubmit = async () => {
    if (category) {
      await addColumn(categoryName, columns); 
    } else {
      await createCategory(categoryName, columns);
    }
    onClose();
  };
  console.log(categoryName,"TEST")

  const handleAddColumnSubmit = async (columnName, columnType) => {
    if (category) {
      // Call API to add column to existing category
      await addColumn(categoryName, columnName, columnType);
      // Add new column to the state as well to update UI
    ;
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: "white", margin: "auto", maxWidth: 400 }}>
        <h2>{category ? "Update Category" : "Create Category"}</h2>
        <TextField
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div>
          {columns.map((column, index) => (
            <div key={index}>
              <TextField
                label="Column Name"
                value={column.name}
                onChange={(e) => handleColumnChange(index, "name", e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={column.type}
                  onChange={(e) => handleColumnChange(index, "type", e.target.value)}
                >
                  <MenuItem value="VARCHAR(255)">STRING</MenuItem>
                  <MenuItem value="INT">NUMBER</MenuItem>
                </Select>
              </FormControl>
              
                <Button onClick={() => setColumns([...columns, { name: "", type: "" }])}>
                  Add Column
                </Button>
            </div>
          ))}
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {category ? "Update Category" : "Create Category"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CategoryForm;
