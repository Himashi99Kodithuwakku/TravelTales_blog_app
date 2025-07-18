const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {createBlogPost,getBlogPost,getallBPosts,updateEditPost,del_post} = require('../controllers/blog_controller');

const fileFilter = (req,file,cb) =>{
    const allwedImgTypes = ['image/png', 'image/jpg','image/jpeg'];
    if(allwedImgTypes.includes(file.mimetype)){
        cb(null,true);

    }else{
        cb(new Error("Invalid image file type Allowed Image types : PNG,JPG,JPEG"),false);
    }
};

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },

    filename: function(req,file,cb){
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null,uniqueName);
    }

});

const upload = multer({ storage:storage, fileFilter:fileFilter});


router.post('/createPost',upload.array('images',5),createBlogPost);
router.get('/getPosts/:user_id',getBlogPost);
router.get('/getPosts',getallBPosts);
router.post('/updatePosts', upload.array('images'),updateEditPost);
router.delete('/deleteBlog/:blog_id',del_post);


module.exports= router;
