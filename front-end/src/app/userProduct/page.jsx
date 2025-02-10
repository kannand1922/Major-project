"use client";

import React, { Suspense } from "react";
import UserProductList from "../../../components/userProduct";
import { useSearchParams } from "next/navigation";

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProductListWrapper />
    </Suspense>
  );
}

function UserProductListWrapper() {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName");

  return <UserProductList categoryName={categoryName} />;
}

export default Page;
