import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal, TextField, Box, Typography } from "@mui/material";
import {
  fetchProducts,
  deleteProduct,
  updateProductById,
} from "../../api/product/productApi";
import { getCategoryColumns } from "../../api/product/categoryApi";
import ProductForm from "../productForm";

const ProductList = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [columns, setColumns] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    getProducts();
    getCategoryColumnsName();
  }, [categoryName]);

  const getProducts = async () => {
    setLoading(true);
    const productList = await fetchProducts(categoryName);
    setProducts(productList);
    setLoading(false);
  };

  const getCategoryColumnsName = async () => {
    setLoading(true);
    const colum = await getCategoryColumns(categoryName);
    setColumns(colum);
    setLoading(false);
  };

  const handleAddProduct = () => setOpenProductForm(true);

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      setLoading(true);
      await updateProductById(categoryName, updatedProduct.id, updatedProduct);
      getProducts();
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(categoryName, productId);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        bgcolor: "background.default",
        background: "linear-gradient(to right, #7b4397, #dc2430)",
        color: "white",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        sx={{
          marginBottom: 2,
          fontWeight: "bold",
        }}
      >
        Add Product
      </Button>

      {openProductForm && (
        <ProductForm
          categoryName={categoryName}
          onClose={() => setOpenProductForm(false)}
          columns={columns}
        />
      )}

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : products.length > 0 ? (
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {products.map((product) => (
            <Box
              key={product.product_id || product.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                bgcolor: "white",
                color: "black",
              }}
            >
              <Box>
                {Object.entries(product).map(([key, value], index) => (
                  <Typography key={`${key}-${index}`} variant="body2">
                    <strong>{key}:</strong>{" "}
                    {key === "image_url" ? (
                      <Box
                        component="img"
                        src={value}
                        alt="Product"
                        sx={{ width: "100%", height: "auto", maxHeight: 150 }}
                      />
                    ) : (
                      value
                    )}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
          No products found.
        </Typography>
      )}

      {editProduct && (
        <Modal
          open={Boolean(editProduct)}
          onClose={() => setEditProduct(null)}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              width: "90%",
              maxWidth: 500,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Edit Product
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editProduct);
              }}
            >
              {Object.entries(editProduct).map(([key, value]) => (
                <Box sx={{ marginBottom: 2 }} key={key}>
                  <TextField
                    label={key}
                    value={value}
                    onChange={(e) =>
                      setEditProduct((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </Box>
              ))}
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditProduct(null)}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default ProductList;
