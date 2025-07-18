
const { v4: uuidv4} = require('uuid');
const {createPost,getPost,getALLpost,updateBlogPost,deleteBlogPost} = require('../models/blog_post_model');


require("dotenv").config();

const createBlogPost = async (req,res) =>{
    try{ 
        const {user_id,visit_date,visit_country,blog_title,blog_content} =req.body;

        if(!user_id||!visit_date ||!visit_country ||!blog_title ||!blog_content){
            return res.status(400).json({error:"All fields required.."});

        }

      
        const blog_id =  "BG" + uuidv4().slice(0,6).toUpperCase();
        const images = req.files?.map(file => file.filename).join(',') || '';

        await createPost({ blog_id,
                           user_id,
                           blog_title: blog_title.trim(),
                           blog_content:blog_content.trim(),
                           images,
                           country_name:visit_country,
                           date_of_visit:new Date(visit_date),
                        });

        res.status(200).json({message:" New Blog Post Created"});

    }catch(error){
        console.error("blog creation failed :",error)
        return  res.status(500).json({error:" Failed to create blog post "});
    }
};

const getallBPosts = async (req,res ) =>{
        getALLpost((err,rows)=>{
            if(err){
                console.error(" Blog load failure",err);
                return res.status(500).json({error:" Failed to Load blog posts"});
            }
             res.status(200).json(rows);

        });


};

const getBlogPost = async (req,res ) =>{
    const user_id = req.params.user_id;
    getPost(user_id,(err,rows)=>{
        if(err){
            console.error(" Blog load failure",err);
            return res.status(500).json({error:" Failed to Load blog posts"});
        }
         res.status(200).json(rows);

    });



};

const updateEditPost = async (req,res) => {
    const {blog_id, user_id,blog_title, blog_content, country_name, date_of_visit} =req.body;
    if(!blog_id || !user_id){
         return res.status(400).json({error:" Missing blog id or user id "});
    }

    const images = req.files?.map(file => file.filename) || [];

    const blog_data ={blog_title, blog_content, country_name,images, date_of_visit,blog_id, user_id,};
    updateBlogPost(blog_data,(err,result)=>{
        if(err){
            return res.status(500).json({error:" Failed to update blog post"});
        }
        res.status(200).json(result);

    });

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);


};

const del_post = async (req,res) =>{
    const blog_id = req.params.blog_id;
    if(!blog_id){
        return res.status(500).json({error:" Blog id is required"});
    }
    console.log("Attempting to delete blog post with ID:", blog_id);
    deleteBlogPost(blog_id,(err)=>{
        if(err){
            console.error("Failed to delete blog post");
            return res.status(500).json({error:" Failed to delete blog post "});
        }
        res.status(200).json({message:"Blog post deleted successfully.."});
    });
};



module.exports = {createBlogPost,getBlogPost,getallBPosts,updateEditPost,del_post};
