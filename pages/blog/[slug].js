import React from 'react'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import axios from 'axios';
export default function BlogPage()


{
    const router=useRouter();
    const{slug}=router.query;
    console.log(slug);
    useEffect(() => {
  const fetchBlog = async () => {
    if (slug) {
      console.log("Inside the slug function");
      try {
        const response = await axios.get(`/api/blog?slug=${slug}`);
        console.log("Response from api for slug", response.data); // ✅ ab chalega
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
  };

  fetchBlog();
}, [slug]);

    return <>
    
    
    <div>
        



    </div>

    </>
}

