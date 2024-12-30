import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal, TextField } from "@mui/material";
import {
  fetchProducts,
  deleteProduct,
  updateProductById,
} from "../../api/product/productApi";
import { getCategoryColumns } from "../../api/product/categoryApi";
import ProductForm from "../productForm";
import "./productList.css";

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
    <div className="product-list-container">
      <button className="add-product-btn" onClick={handleAddProduct}>
        Add Product
      </button>

      {openProductForm && (
        <ProductForm
          categoryName={categoryName}
          onClose={() => setOpenProductForm(false)}
          columns={columns}
        />
      )}

      {loading ? (
        <div className="loader-container">
          <CircularProgress />
        </div>
      ) : products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div
              className="product-card"
              key={product.product_id || product.id}
            >
              <div className="product-details">
                {Object.entries(product).map(([key, value], index) => (
                  <div key={`${key}-${index}`}>
                    <span>{key}:</span>{" "}
                    {key === "image_url" ? (
                      <img
                        src={value}
                        alt="Product"
                        className="product-image"
                      />
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>

              <div className="product-actions">
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-message">No products found.</div>
      )}

      {/* Modal for editing product */}
      {editProduct && (
        <Modal
          open={Boolean(editProduct)}
          onClose={() => setEditProduct(null)}
          className="edit-modal"
        >
          <div className="modal-content">
            <h2>Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editProduct);
              }}
            >
              {Object.entries(editProduct).map(([key, value]) => (
                <div className="form-field" key={key}>
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
                </div>
              ))}
              <div className="form-actions">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="save-btn"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditProduct(null)}
                  className="cancel-btn"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
