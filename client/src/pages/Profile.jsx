import React ,{useState,useEffect}from "react";
import {Container, Row,Col,Button, Card,Image} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from "axios";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faEarthAsia} from '@fortawesome/free-solid-svg-icons';

// import { useNavigate } from "react-router-dom";
import CreateBlogPost from "../modal/CreatePost";
import ViewBlogPost from "../modal/ViewPost";

function Profile(){
    const [showCreatePostModal,setShowCreatePostModal] = useState(false);
    const [posts,setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;
    // const navigate = useNavigate();
    const [showViewModal,setShowViewModal] = useState(false);
    const [selectedPost,setSelectedPost] = useState(null);

    
    
    const refreshPosts = async () => {
        try{
            const response = await axios.get(`http://localhost:5050/api/TravelTales/blog/getPosts/${userId}`);
            setPosts(response.data);
        }catch(err){
            console.error("Failed to load posts",err);
            toast.error("Failed to load posts");
        }
    };

    useEffect(()=>{
        if(userId){
            refreshPosts();
        }
    },[userId]);

   


    return(
        <>
        
        <Container className="mt-5">
             <h2 className="mt-5  mb-5" > Profile</h2>
            <Card className="p-4 mb-4 shadow-sm border-0">
                <Row className="align-items-center">
                    <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                    <Image src={`http://ui-avatars.com/api/?name=${user.username || "user"}&background=0D8ABC&color=fff`} roundedCircle width="100" height="100"/>
                    </Col>
                    
                    <Col xs={12} md={3}>
                      <h3 className="mb-1">{user?.username || "Username"}</h3>
                        <p className="text-muted mb-0">{user?.email || "user@gmail.com"}</p>
                    </Col>
                    <Col xs={6} className="mt-3">
                        <Row className="justify-content-center text-center">
                            <Col className="ms-5">
                                <h4>Posts</h4>
                            </Col>
                            <Col>
                                <h4>Followers</h4>
                            </Col>
                            <Col>
                                <h4>Following</h4>
                            </Col>
                        </Row>
                    </Col>
                    
                   
                    <Col xs={12} md={12} className="text-end mt-5 me-5">
                        <Button variant="secondary" onClick={()=>setShowCreatePostModal(true)} className="me-4"> create </Button>
                    </Col>
                </Row>


            </Card>
           
           
            <Row className="g-4">
                {posts.map((post)=>(
                    <Col key={post.blog_id} md={6} lg={3}>
                        <Card onClick={()=> {setSelectedPost(post); setShowViewModal(true); }} style={{cursor:"pointer",height:"100%",width:"100%", minWidth:"200px", minHeight:"200px",display:"flex",flexDirection:"column"}}>
                            {post.images && post.images.length > 0 && (
                                <Card.Img variant ="top" src={`http://localhost:5050/uploads/${post.images.split(",")[0]}`} alt='bg'  style={{ height: "100px", objectFit: "cover" }}></Card.Img>
                            )}
                            <Card.Body>
                                <Card.Title> {post.blog_title}</Card.Title><hr/>
                                <Card.Title> {post.country}</Card.Title>
                                <Card.Text> {post.blog_content.length > 150 ? post.blog_content.slice(0,150) + "..." : post.blog_content} </Card.Text>
                                <Card.Subtitle className=" text-muted"> Visited : {new Date(post.date_of_visit).toLocaleDateString()}</Card.Subtitle>
                                <Card.Text> Author: {user?.username} </Card.Text>
                                <Card.Text> Posted: {post.blog_post_created} </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
               
            </Row>
           
                 
                    

                
            
        </Container>
         <CreateBlogPost show={showCreatePostModal} modalClose={()=>setShowCreatePostModal(false)} />
        <ViewBlogPost show={showViewModal} modalClose={()=>setShowViewModal(false)} postData={selectedPost} onPostDeleted={refreshPosts}/>


        </>
    

    )


};

export default Profile;