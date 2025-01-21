// pages/CategoryPage.js
import React, { useState } from "react";
import CategoryList from "../categoryList.js";
import ProductList from "../productList/index.js";

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
