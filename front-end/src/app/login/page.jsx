'use client';
import React from 'react'
import Login from '../../../components/Login/login'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
function page() {
const router = useRouter();


  return (
    <div><Login/></div>
  )
}

export default page