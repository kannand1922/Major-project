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
  Typography,
} from "@mui/material";
import { createCategory, addColumn } from "../../api/product/categoryApi";

const CategoryForm = ({ onClose, category }) => {
  const [categoryName, setCategoryName] = useState("");
  const [columns, setColumns] = useState([{ name: "", type: "" }]);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setColumns(category.columns || [{ name: "", type: "" }]);
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

  const handleAddColumnSubmit = async (columnName, columnType) => {
    if (category) {
      await addColumn(categoryName, columnName, columnType);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
          maxWidth: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
          {category ? "Update Category" : "Create Category"}
        </Typography>

        <TextField
          label="Category Name"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {columns.map((column, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <TextField
              label="Column Name"
              value={column.name}
              onChange={(e) => handleColumnChange(index, "name", e.target.value)}
              sx={{ flex: 2 }}
            />
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Data Type</InputLabel>
              <Select
                value={column.type}
                onChange={(e) => handleColumnChange(index, "type", e.target.value)}
              >
                <MenuItem value="VARCHAR(255)">STRING</MenuItem>
                <MenuItem value="INT">NUMBER</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ))}

        <Button
          onClick={() => setColumns([...columns, { name: "", type: "" }])}
          sx={{
            alignSelf: "center",
            backgroundColor: "#4caf50",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#45a049" },
          }}
        >
          Add Column
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          {category ? "Update Category" : "Create Category"}
        </Button>
      </Box>
    </Modal>
  );
};

export default CategoryForm;
