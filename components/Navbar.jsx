// app/components/Navbar.tsx (or .jsx if not using TypeScript)

"use client";

import Logo from "@/components/Logo";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 mx-8 sm:mx-20 xl:mx-20"> 
    
    <Logo/>
    <button className="rounded-full text-sm cursor-pointer bg-purple-600 text-white font-bold px-3 py-2">
  Login For Comment
</button>


    </div>
  );
};

export default Navbar;
