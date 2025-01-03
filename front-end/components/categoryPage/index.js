// pages/CategoryPage.js
import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";

const CategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div>
      {!selectedCategoryId ? (
        <CategoryList onSelectCategory={setSelectedCategoryId} />
      ) : (
        <ProductList categoryId={selectedCategoryId} />
      )}
    </div>
  );
};

export default CategoryPage;
