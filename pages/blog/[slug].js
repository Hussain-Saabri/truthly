import React, { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import axios from 'axios';
import BlogActions from '@/components/BlogActions';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import CommentSection from '@/components/CommentSection';

export default function BlogPage() {
  const [showContent, setShowContent] = useState(false);
  const [allblogs, setAllblogs] = useState([]);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blog?slug=${slug}`);
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
    const incrementViews = async () => {
      if (slug) {
        try {
          await axios.put(`/api/blog?slug=${slug}`);
        } catch (error) {
          console.error("Error incrementing views:", error);
        }
      }
    };
    incrementViews();
  }, [slug]);

  const extractFirstImageUrl = (markdown) => {
    const match = markdown?.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  };

  if (!showContent || !allblogs.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const Code = ({ children }) => (
    <code className="bg-gray-100 text-purple-600 px-1 rounded">{children}</code>
  );

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-10">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Blog Content */}
        <div className="flex-1 space-y-6 sm:bg-transparent sm:rounded-none sm:shadow-none p-0 lg:p-6">
          {/* Title and Meta */}
          <div className="space-y-1">
            <h1 className="text-[30px] text-left font-semibold break-words whitespace-normal font-sans leading-[30px] relative -top-[15px] sm:text-4xl sm:font-bold text-gray-900 sm:leading-tight">
              {allblogs?.[0]?.title}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              By <span className="text-purple-600 font-medium">Truthly</span> 
              <span className="ml-1">{allblogs?.[0]?.blogcategory || 'Unknown'}</span> 
              <span className="ml-1">
                {new Date(allblogs[0]?.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>   
              <span className="ml-1 text-red-500 font-semibold">{allblogs?.[0]?.viewsCount} Views</span>
            </p>
           
          </div>

          {/* Audio */}
          {allblogs?.[0]?.audioLink && (
            <div className="bg-gray-100 p-4 rounded-xl">
              <audio controls className="w-full">
                <source src={allblogs?.[0]?.audioLink} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-sm sm:prose-base max-w-none text-justify p-0 sm:p-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code: Code,
                img: ({ node, ...props }) => (
                  <div className="text-center">
                    <img
                      {...props}
                      className="w-full h-auto rounded-xl object-cover my-4 shadow-md"
                      alt={props.alt || 'Blog image'}
                    />
                    {props.alt && (
                      <p className="text-sm text-gray-500 mt-2 italic">{props.alt}</p>
                    )}
                  </div>
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
             <BlogActions/>
           
          </div>
        </div>

        {/* Sidebar - Hidden on Mobile */}
        <aside className=" lg:block w-full lg:w-[330px]">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Recent Blogs</h2>
          <div className="space-y-4">
            {publishedBlogs.map((blog, index) => {
              const firstImageUrl = extractFirstImageUrl(blog.description);
              return (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={blog._id}
                  className="group bg-white p-4 rounded-2xl shadow hover:shadow-xl transition-all duration-200 flex gap-4 items-start"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <img
                    src={firstImageUrl || "/img/noimage.jpg"}
                    alt="blog"
                    className="w-[90px] h-[65px] object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900  group-hover:text-purple-600 transition line-clamp-2">
                      {blog.title}
                    </p>
                    <span className="absolute top-15 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md bg-gradient-to-r from-purple-600 to-pink-500">
                      {blog.blogcategory || "General"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
