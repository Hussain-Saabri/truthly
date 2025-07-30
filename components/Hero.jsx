import { useState ,useEffect} from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import Link from "next/link";
const Hero = () => {

  
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Technology", "Startup", "Lifestyle", "Travel", "Health", "Finance"];
const [allblogs,setAllBlogs]=useState([]);
function extractFirstImage(markdown) {
  const match = markdown.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : "https://media.licdn.com/dms/image/v2/D4E0BAQG6qByAm0KoRg/company-logo_200_200/company-logo_200_200/0/1721044168622/truthlyai_logo?e=2147483647&v=beta&t=S3WM4FY-uC6DcGSHwmSDFK6HZ914H3O7gyRO2WVi90k"; // fallback image
}

function markdownToPlainText(markdown) {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, "")           // remove images
    .replace(/\[.*?\]\(.*?\)/g, "")            // remove links
    .replace(/[*_~`>#-]/g, "")                 // remove markdown symbols
    .replace(/[\r\n]+/g, " ")                  // remove newlines
    .trim();
}


  //fetching all the data to be displayed into the category
  useEffect(() => {
      const fetchAllBlogs = async () => {
        try {
          console.log("Inside the fetched blog function");
          const response = await axios.get("/api/blog/");
          const publishedBlogs = response.data.filter(
  (blog) => blog.status === "publish"
);
console.log(publishedBlogs.length);
setAllBlogs(publishedBlogs);
console.log(allblogs.length);
         
          console.log("Get all blogs",response.data[0]);
          console.log("getting an cate",response.data[0]);
        } catch (error) {
          console.error("Failed to fetch blogs", error);
        }
      };
      
        fetchAllBlogs();
      
    }, []);
  return (
    <>
    
    
    <section className="relative py-20 sm:py-14 text-center overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 blur-2xl"
        style={{
          backgroundImage: "url('/gradientBackground.png')",
        }}
      />

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
        Read. Explore. Inspire.<br />
        <span className="text-purple-600">Your blog, your voice.</span>
      </h1>

      {/* Subtext */}
      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto ">
        A clean, powerful platform to express your thoughts and reach the world with your stories.
      </p>

      {/* Search Bar */}
      <div className="mt-6 px-4 sm:px-0 flex justify-center max-w-xl mx-auto border border-gray-300 shadow-md rounded-full overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Search for blogs"
          className="w-full px-6 py-3 text-gray-800 focus:outline-none"
        />
        <button className="bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white px-6 py-3 font-semibold transition">
          Search
        </button>
      </div>

      {/* Categories */}
      <div className="mt-8 mb-0 flex justify-center gap-3 flex-wrap text-sm font-medium">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full border transition hover:cursor-pointer duration-200 ${
              activeCategory === category
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-purple-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
  
  
  {allblogs.length > 0 && (
  <>
  
    {allblogs.map((blog, index) => (
      <>
      <Link href={`/blog/${blog.slug}`}>
      <BlogCard
        key={index}
        image={extractFirstImage(blog.description)}
        category={blog.blogcategory}
        title={blog.title}
        description={markdownToPlainText(blog.description)}
      />
      </Link>
      </>
    ))}
   
  </>
)}


 
  
</div>

 
    </>
  );
};

export default Hero;
