'use client';
import React from 'react'
import Login from '../../../components/Login/login'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
function page() {
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signup'); // Redirect to signup if no token
    }
  }, []);
  return (
    <div><Login/></div>
  )
}

export default page