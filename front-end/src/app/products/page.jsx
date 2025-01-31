'use client';
import React,{useEffect} from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "../../../components/productList";
import { useRouter } from "next/navigation";
function Page() {
const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/signup'); // Redirect to signup if no token
  //   }
  // }, []);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName");

  return (
    <div>
      <ProductList categoryName={categoryName} />
    </div>
  );
}

export default Page;
