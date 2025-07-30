import React from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default function BlogPage({ blogData }) {
  const views = 20;

  const extractFirstImageUrl = (markdown) => {
    const match = markdown?.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  };

  const Code = ({ children }) => (
    <code className="bg-gray-100 text-purple-600 px-1 rounded">{children}</code>
  );

  const blog = blogData?.[0];

  return (
    <>
      <Navbar />
      <div className="bg-[#eeeeee65] min-h-screen px-4 sm:px-6 lg:px-20 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Blog Title & Info */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{blog?.title}</h1>
            <p className="text-sm text-gray-600">
              By <span className="text-purple-700 font-medium">Truthly</span> ・
              Published in <span className="font-medium">{blog?.blogcategory || 'Unknown'}</span> ・
              {blog?.createdAt
                ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Date not available'} ・
              1 Min Read ・ <span className="text-red-500 font-semibold">{views} Views</span>
            </p>
          </div>

          {/* Audio (if available) */}
          {blog?.audioLink && (
            <div>
              <audio controls className="w-full rounded">
                <source src={blog.audioLink} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Blog Content */}
          <div className="bg-white rounded-2xl">
            <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert text-justify p-3">
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
                        <p className="text-sm text-gray-500 mt-2 italic text-center my-6 decoration-2 underline">
                          {props.alt}
                        </p>
                      )}
                    </>
                  ),
                }}
              >
                {blog?.description || ''}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SSR to fetch data from server before rendering
export async function getServerSideProps(context) {
  const { slug } = context.query;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?slug=${slug}`);
    return {
      props: {
        blogData: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      props: {
        blogData: [],
      },
    };
  }
}
