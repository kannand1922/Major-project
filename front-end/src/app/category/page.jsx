// pages/CategoryPage.js
'use client';
import CategoryList from "../../../components/categoryList.js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar/index.js";
const CategoryPage = () => {
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signup'); 
    }
  }, []);
  return (
    <div>
      <CategoryList/>
    </div>
  );
};

export default CategoryPage;
