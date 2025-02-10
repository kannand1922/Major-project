"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductList from "../../../components/productList";

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListWrapper />
    </Suspense>
  );
}

function ProductListWrapper() {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName");

  return <ProductList categoryName={categoryName} />;
}

export default Page;
