
import React ,{useState} from "react";
import {Modal,Button,Row,Col,ModalFooter} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDays,faEarthAmericas,faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import EditBlogPost from "./EditPost";
import { toast } from 'react-toastify';
import axios from "axios";




function ViewBlogPost({show,modalClose,postData,onPostDeleted}){

    
    const [showEditModal,setShowEditModal] = useState(false);

    if(!postData) return null;
    const {blog_id,blog_title,  date_of_visit,country_name, blog_content, images, blog_post_created, username,} = postData;

    const imageArray = typeof images === "string" ? images.split(",") : Array.isArray(images) ? images : [];


    const deletePost= async()=>{
        if(!blog_id){
            toast.error("Blog post missing");
            return;
        }

         console.log("Deleting blog post with ID:", blog_id); 

        if(!window.confirm('Are you sure you want to delete this blog post?')){
            return;

        }

        try{
            const response = await axios.delete(`http://localhost:5050/api/TravelTales/blog/deleteBlog/${blog_id}`);

            if(response.status === 200){
                toast.success("Blog post deleted");
                modalClose();
                if(onPostDeleted) onPostDeleted();
            }else{
                toast.success("BFailed to delete post");
            }
        }catch(error){
            console.error(error);
            toast.error("Error occured deleting post ")
        }

    };


    

    return(
        <>
        <Modal show={show} onHide={modalClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center mb-1"> {blog_title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className="mb-3">
                    <Col md={6}>
                        <strong> <FontAwesomeIcon icon={faCalendarDays} style={{color: "#4676c8",}} /> Date of Visit :</strong>
                       {new Date(date_of_visit).toLocaleDateString()}
                    </Col>

                    <Col md={6}>
                        <strong> <FontAwesomeIcon icon={faEarthAmericas} style={{color: "#74C0FC",}} /> Country :</strong>
                        {country_name}
                    </Col>
                </Row>
                <hr></hr>

                <div className="light mb-4 ">
                    <p>{blog_content}</p>
                </div>

                {imageArray.length > 0 && (
                    <div className="mb-4">
                        <strong><FontAwesomeIcon icon={faCameraRetro} />Pictures</strong>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {imageArray.map((img,index)=>(
                                <img key={index} src={`http://localhost:5050/uploads/${img}`} alt="images"  style={{width:"200px",height:"200px",objectFit:"cover", boxShadow:"0 0 8px rgba(0,0,0,0.1)",}}/>
                            ))} </div>
                    </div>
                )}

                <hr/>
                <div className="text-start">
                    <small className="text-muted">
                        Posted on {new Date(blog_post_created).toLocaleString()} by <b>{username}</b>
                    </small>
                </div>

               
                    
                <ModalFooter className="d-flex justify-content-between">
                    <Button variant="danger" className="me-2" onClick={deletePost}>  Delete </Button>
                    <div>
                        <Button variant="secondary" className="me-2" onClick={()=>{setShowEditModal(true); modalClose();}} >  Edit </Button>
                        <Button variant="secondary" className="me-2" onClick={modalClose}>  Cancel </Button>
                    </div>
                   

                </ModalFooter>
            
            
            
                
            </Modal.Body>
           
        </Modal>

        <EditBlogPost show={showEditModal} modalClose={()=>setShowEditModal(false)} postData={postData}/>
        
 

        </>


    )
};

export default ViewBlogPost;