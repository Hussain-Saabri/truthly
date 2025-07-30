// app/components/Navbar.tsx (or .jsx if not using TypeScript)

"use client";

import Link from "next/link";
const Navbar = () => {
  return (
   // Navbar.tsx
<div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
    <div className="flex justify-between items-center py-3">

      {/* LOGO */}
      <Link href="/">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[#5B21B6] dark:text-white tracking-wide uppercase">
  Truthly
</h1>
</Link>




      {/* MENU - Desktop */}
      <div className="hidden sm:flex items-center space-x-6">
        <a href="/" className="text-gray-700 font-medium hover:text-purple-600 transition">Home</a>
        <a href="/blogs" className="text-gray-700 font-medium hover:text-purple-600 transition">Blogs</a>
        <a href="/about" className="text-gray-700 font-medium hover:text-purple-600 transition">About</a>
        <button className="rounded-full text-sm bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 transition">
          Login
        </button>
      </div>

      {/* Hamburger Menu - Mobile 
      
      
      
      */}
      
      <div className="sm:hidden">
        <button className="text-3xl text-purple-600 focus:outline-none">
          ☰
        </button>
      </div>

    </div>
  </div>
</div>



  );
};

export default Navbar;
