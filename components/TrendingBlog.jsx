const TrendingBlog = ({ image, title, category, description }) => {
  return (
    <section className="py-12 px-6 sm:px-20 xl:px-36">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
        <span className="text-purple-700 text-4xl">🔥</span> Trending Now
      </h2>

      <div className="relative flex flex-col sm:flex-row rounded-3xl overflow-hidden bg-white/60 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-10 blur-3xl pointer-events-none" />

        {/* Image Section with fixed height and object-contain */}
        <div className="sm:w-1/2 w-full h-64 overflow-hidden">
          <img
            src={image}
            alt="trending"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text Section */}
        <div className="sm:w-1/2 w-full p-8 flex flex-col justify-center gap-4 z-10 bg-white/70 backdrop-blur-lg">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full w-fit shadow-md uppercase tracking-wide">
            {category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-snug hover:text-purple-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[15px] text-gray-700 leading-relaxed">
            {description}
          </p>
          <button className="mt-2 text-sm font-semibold text-purple-700 hover:text-indigo-700 transition-colors duration-300 underline underline-offset-4 w-fit">
            Read Full Article →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingBlog;
