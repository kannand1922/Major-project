'use client';
import React from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "../../../components/productList";

function Page() {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName");

  return (
    <div>
      <ProductList categoryName={categoryName} />
    </div>
  );
}

export default Page;
