import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim() === '') return;
    const newComment = {
      id: Date.now(),
      text: input.trim(),
      time: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
    setInput('');
  };

  return (
    <div className="mt-8 p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Comments</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleAddComment}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Post
        </button>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-2">
            <p className="text-gray-700">{comment.text}</p>
            <span className="text-xs text-gray-400">{comment.time}</span>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
