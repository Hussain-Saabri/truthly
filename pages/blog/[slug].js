import React from 'react'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function BlogPage()


{
  const[allblogs,setAllblogs]=useState();  
  const router=useRouter();
  const views=20;
    const{slug}=router.query;
    console.log(slug);
    useEffect(() => {
  const fetchBlog = async () => {
    if (slug) {
      console.log("Inside the slug function");
      try {
        const response = await axios.get(`/api/blog?slug=${slug}`);
        console.log("Response from api for slug", response.data);
        setAllblogs(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }
  };

  fetchBlog();
}, [slug]);

    return <>
    
    <div className='flex justify-between items-center py-20 mx-8 sm:mx-17 xl:mx-20'>
    <div className="topslug_titles" data-aos="fade-right">
            <p className="slugtitle">{allblogs && allblogs[0]?.title}</p>
            <h5>
              By <span>sacchibaatein</span>・ Published in <span>{allblogs?.[0]?.blogcategory || 'Category not available'}</span> ・ 
              {allblogs?.[0]?.createdAt 
                ? new Date(allblogs[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
                : 'Date not available'
              }
              <span>・ 1 min read</span>・ <span>{views} views</span>
              <div className='py-4'>
                <audio controls>
                  <source src={allblogs&& allblogs[0]?.audioLink} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </h5>
    </div>
    </div>

    </>
}

