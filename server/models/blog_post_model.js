const db = require('../database/table');
require('dotenv').config();



// save created post 

const createPost =  (blog,callback)=>{
    const createPostQuery =`
                            INSERT INTO blog_posts (
                            blog_id,
                            user_id,
                            blog_title,
                            blog_content,
                            images,
                            country_name,
                            date_of_visit) VALUES (?,?,?,?,?,?,?)`;
    
    db.run(createPostQuery,[blog.blog_id,blog.user_id,blog.blog_title,blog.blog_content,blog.images,blog.country_name,blog.date_of_visit],callback);
                           
};


// get all  blog post 

const getALLpost = (callback) => {
    const getAllPostsQuery =  `SELECT b.*, u.username 
                               FROM blog_posts AS b 
                               JOIN users AS u ON  b.user_id =u.user_id
                               ORDER BY b.blog_post_created DESC `;
    db.all(getAllPostsQuery,[],(err,rows)=>{
        callback(err,rows);
    });

};

// get post by user id 

const getPost = (user_id,callback) =>{
    const getPost = `SELECT  b.*, u.username 
                    FROM blog_posts AS b 
                    JOIN users AS u ON b.user_id = u.user_id
                    WHERE b.user_id = ?
                    ORDER BY b.blog_post_created DESC `;
    db.all(getPost,[user_id],callback);
};


// update blog post 
const updateBlogPost = (blog_data,callback)=>{
    const updateQuery = `UPDATE blog_posts 
                        SET blog_title = ?,
                        blog_content = ?,
                        date_of_visit = ?,
                        country_name=?,
                        images= ?
                        WHERE blog_id = ? AND user_id =? `;
     db.run(updateQuery,[blog_data.blog_title,blog_data.blog_content,blog_data.country_name,blog_data.images,blog_data.date_of_visit,blog_data.blog_id,blog_data.user_id],callback);
    
}   

const deleteBlogPost = (blog_id,callback)=>{
    const deleteQueury = `DELETE FROM blog_posts WHERE blog_id = ?  `;
    db.run(deleteQueury,[blog_id],function(err){
        if(err){
            console.error("SQLTE error" , err);
            callback(err);
        }else {
            callback(null);
        }
    })
}
module.exports = {createPost,getPost,getALLpost,updateBlogPost,deleteBlogPost};

