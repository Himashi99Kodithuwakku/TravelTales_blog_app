import React,{useState,useEffect}from "react";
import {Container, Row,Col,Card} from 'react-bootstrap';

// import { toast } from 'react-toastify';
import axios from "axios";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faEarthAsia} from '@fortawesome/free-solid-svg-icons';
import CreateBlogPost from "../modal/CreatePost";

import ViewBlogPost from "../modal/ViewPost";
 
function HomePage(){
        const [showCreatePostModal,setShowCreatePostModal] = useState(false);
        const [posts,setPosts] = useState([]);
      
        // const navigate = useNavigate();
        const [showViewModal,setShowViewModal] = useState(false);
        const [selectedPost,setSelectedPost] = useState(null);
    
        


    
    useEffect(()=> {
        const getAllBlogPost = async () => {
            try{
                const response = await axios.get(`http://localhost:5050/api/TravelTales/blog/getPosts`);
                setPosts(response.data);
            }catch(err){
                console.error("Failed to load posts",err);
            }
    };

    getAllBlogPost();
    },[]);
 

    return(
        <>
        <Container className="mt-5 p-5">
            
                   
            <Row className="g-4">
                <h1 className="mt-5">Explore Amazing stories around the world..</h1>
                {posts.map((post)=>(
                    <Col key={post.blog_title} md={6} lg={3}>
                        <Card onClick={()=> {setSelectedPost(post); setShowViewModal(true); }} style={{cursor:"pointer", height:"100%", minHeight:"200px",display:"flex",flexDirection:"column"}}>
                            {post.images && post.images.length > 0 && (
                                <Card.Img variant ="top" src={`http://localhost:5050/uploads/${post.images.split(",")[0]}`} alt='bg'  style={{ height: "100px", objectFit: "cover" }}></Card.Img>
                            )}
                            <Card.Body>
                                <Card.Title> {post.blog_title}</Card.Title>
                                <Card.Title> {post.country}</Card.Title>
                                <Card.Text> {post.blog_content.length > 150 ? post.blog_content.slice(0,150) + "..." : post.blog_content} </Card.Text>
                                <Card.Subtitle className="text-muted" > Visited : {new Date(post.date_of_visit).toLocaleDateString()}</Card.Subtitle>
                                <Card.Text className ="text-muted" style={{ fontSize: "0.9rem" }}> Author: {post.username} </Card.Text>
                                <Card.Text className ="text-muted" style={{ fontSize: "0.9rem" }}> Posted: {post.blog_post_created} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
               
            </Row>

        </Container>
         <CreateBlogPost show={showCreatePostModal} modalClose={()=>setShowCreatePostModal(false)} />
        <ViewBlogPost show={showViewModal} modalClose={()=>setShowViewModal(false)} postData={selectedPost}/>


        </>
    


       

       



       
    );


}

export default HomePage;