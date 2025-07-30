import { useEffect, useState } from "react";
import axios from "axios";

const BlogCard = ({ image, category, title, description }) => {
  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-purple-500/30 transition-all duration-500 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="overflow-hidden">
        <img
          src={image}
          alt="blog"
          className="w-full h-46 object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-3xl"
        />
      </div>

      <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md bg-gradient-to-r from-purple-600 to-pink-500">
        {category}
      </div>

      <div className="p-6 flex flex-col gap-1 ">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 ">
          {title.length > 50 ? title.slice(0, 50) + "..." : title}
        </h3>

        <p className="text-[13px] text-gray-600 leading-relaxed text-justify tracking-wide">
          {description.length > 45 ? description.slice(0, 50) + "..." : description}
         
        </p>
        <button className="mt-0 text-sm font-semibold text-purple-700 hover:underline underline-offset-4 self-start">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
