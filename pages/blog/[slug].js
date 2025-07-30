import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import axios from 'axios';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';


export default function BlogPage() {

  const [showContent, setShowContent] = useState(false);
  const [allblogs, setAllblogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  const views = 20;
useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // ⏱ 2 seconds delay

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blog?slug=${slug}`);
          console.log("All blogs",response.data)
          setAllblogs(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };

    

    const fetchAllPublishedBlogs = async () => {
      try {
        const response = await axios.get('/api/blog/');
        const published = response.data.filter(blog => blog.status === 'publish');
        setPublishedBlogs(published);
      } catch (error) {
        console.error("Error fetching published blogs:", error);
      }
    };

    fetchBlog();
    fetchAllPublishedBlogs();
  }, [slug]);

    useEffect(() => {
      const incrementViews=async()=>{
        if(slug)
        {
          try{
            console.log("getting the views")
            const response=await axios.put(`/api/blog?slug=${slug}`) 
            console.log("getting the count from api",response);

          }catch(error){

          }
        }
      };
      incrementViews();
    
    },[slug])
//dipaying the first image
{/*
  const extractFirstImageUrl = (markdown) => {
    const match = markdown?.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  };
 */ }
  if (!showContent || !allblogs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader/>
       
      </div>
    );
  }

  const Code = ({ children }) => (
    <code className="bg-gray-100 text-purple-600 px-1 rounded">{children}</code>
  );
 

  return (
    <>
      
      <div className="bg-[#eeeeee65] min-h-screen px-4 sm:px-6 lg:px-20 py-10">
  <div className="max-w-4xl mx-auto space-y-6">

    {/* Blog Title & Info */}
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">{allblogs?.[0]?.title}</h1>
      <p className="text-sm text-gray-600">
        By <span className="text-purple-700 font-medium">Truthly</span> .
        Published in <span className="font-medium">{allblogs?.[0]?.blogcategory || 'Unknown'}</span> ・
        {allblogs?.[0]?.createdAt
          ? new Date(allblogs[0].createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Date not available'}  .
        1 Min Read ・ <span className="text-red-500 font-semibold">{allblogs?.[0]?.viewsCount} Views</span>
      </p>
    </div>

    {/* Audio (if available) */}
    {allblogs?.[0]?.audioLink && (
      <div>
        <audio controls className="w-full rounded">
          <source src={allblogs?.[0]?.audioLink} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    )}

    {/* Blog Image (first from markdown) */}
    {
      /* {extractFirstImageUrl(allblogs?.[0]?.description) && (
      <img
        src={extractFirstImageUrl(allblogs?.[0]?.description)}
        alt="Blog cover"
        className="w-full rounded-lg shadow-md object-cover"
      />
    )}*/
    }
    

    {/* Blog Content */}
    <div className='bg-white rounded-2xl '>
    <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert text-justify p-3 ">
     <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw]}
  components={{
    code: Code,
    img: ({ node, ...props }) => (
  <>
    <img
      {...props}
      className="w-full h-auto max-h-[300px] rounded-xl object-cover my-4 mx-auto sm:max-h-[450px]"
      alt={props.alt || 'Blog image'}
    />
    {props.alt && (
      <span className="block text-sm text-gray-500 mt-2 italic text-center my-6 decoration-2 underline">
        {props.alt}
      </span>
    )}
  </>
),


    iframe: ({ node, ...props }) => (
      <div className="overflow-hidden rounded-xl shadow-lg my-6">
        <iframe
          {...props}
          className="w-full h-[250px] sm:h-[350px] rounded-xl"
          allowFullScreen
        />
      </div>
    ),
  }}
>
  {allblogs?.[0]?.description || ''}
</ReactMarkdown>


    </div>
    </div>
  </div>
</div>

    </>
  );
}
