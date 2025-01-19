'use client'
import React from 'react'
import UserProductList from '../../../components/userProduct'
import { useSearchParams } from "next/navigation";

function page() {
    const searchParams = useSearchParams();
    const categoryName = searchParams.get("categoryName");
  
  return (
    <div><UserProductList categoryName={categoryName}/></div>
  )
}

export default page