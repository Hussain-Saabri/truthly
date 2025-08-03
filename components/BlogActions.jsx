import React from 'react';
import { FiCopy } from 'react-icons/fi';
import { AiOutlineLike } from 'react-icons/ai';
import { BsVolumeUp } from 'react-icons/bs';
import { RiShareForwardLine } from 'react-icons/ri';

const BlogActions = () => {
  return (
    <div className="mt-8 flex items-center justify-around px-4 py-3 border-t border-black">
      {/* Copy Link */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
        <FiCopy className="text-xl" />
        <span className="text-sm font-medium">Copy</span>
      </button>

      {/* Like */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition">
        <AiOutlineLike className="text-xl" />
        <span className="text-sm font-medium">Like</span>
      </button>

      {/* Sound */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
        <BsVolumeUp className="text-xl" />
        <span className="text-sm font-medium">Sound</span>
      </button>

      {/* Share */}
      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
        <RiShareForwardLine className="text-xl" />
        <span className="text-sm font-medium">Share</span>
      </button>
    </div>
  );
};

export default BlogActions;
