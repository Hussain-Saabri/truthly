import { Schema, model, models } from "mongoose";
const blogSchema=new Schema({

    title:{type:String},
    slug:{type:String,required:true},
    description:{type:String},
    //blogcategory: ["motivation", "health", "career"]
    blogcategory:[{type:String}],
    tags:[{type:String}],
    status: { type: String },
    audioLink: { type: String },
    },
    
{
    timestamps: true

});


// Prevent model overwrite error in Next.js, model gets saved in the internak memory/register

const Blog=models.Blog || model('Blog',blogSchema,'blogtest');
export default Blog;