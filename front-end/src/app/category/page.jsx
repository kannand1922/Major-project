// pages/CategoryPage.js
'use client';
import CategoryList from "../../../components/categoryList.js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const CategoryPage = () => {
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signup'); // Redirect to signup if no token
    }
  }, []);
  return (
    <div>
      <CategoryList/>
    </div>
  );
};

export default CategoryPage;
