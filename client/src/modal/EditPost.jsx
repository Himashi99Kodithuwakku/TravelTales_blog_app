
import React, { useState,useEffect} from "react";
import {Modal,Button,Form,Row,Col, ModalFooter} from 'react-bootstrap';
// import {Eye,EyeSlash} from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import axios from "axios";




function EditBlogPost({show,modalClose,postData}){

    
    const[userId,setUserId] = useState('');
    const[images,setImages] = useState([]);
    const[visitDate,setVisitDate] = useState('');
    const[title,setTitle] = useState('');
    const[content,setContent] = useState('');
    const[country,setCountry] = useState('');
 
    const [countryDropdown,setCountryDropdown]= useState([]);

     useEffect(() => {
        if (!show) return;

        const loggedUser = localStorage.getItem("user");
        if (!loggedUser) {
            toast.error("User not logged in");
            return;
        }

        try {
            const parsedUser = JSON.parse(loggedUser);
            if (parsedUser?.user_id) {
                setUserId(parsedUser.user_id);
            } else {
                toast.error("User data missing");
            }
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
            toast.error("User session invalid");
        }



    }, [show]);



    useEffect(() => {
    if (show && postData) {
        setTitle(postData.blog_title || '');
        setContent(postData.blog_content || '');

        const visitDateRaw = postData.date_of_visit;
        let visitDateFormatted='';
        if(visitDateRaw){
            const parsedDate = new Date(visitDateRaw);
            if(!isNaN(parsedDate.getTime())){
                visitDateFormatted=parsedDate.toISOString().split('T')[0];
            }else{
                console.error("Invalid date ",visitDateRaw);
            }
        }
        setVisitDate(visitDateFormatted);
        setCountry(postData.country_name || '');
        setImages([]);

        console.log("Raw visit date from postData:", postData.date_of_visit);

    }
}, [show, postData]);

    useEffect(()=>{
        const getCountries = async () => {
            try{
                const response = await axios.get('http://localhost:5050/api/TravelTales/country/all');
                setCountryDropdown(response.data);
            }catch(error){
                console.error("Failed to load countries");
                toast.error("Unable to Load Countries! ");
            }
        };

        getCountries();

    },[]);


    const changeImages = (e) =>{
        const img_files = Array.from(e.target.files);
        setImages((prev) => [...prev,...img_files]);
    };


   

    const post = async (e) =>{
        e.preventDefault();


        try{
            const bg_PostData = new FormData();

            bg_PostData.append("blog_id", postData.blog_id);
            bg_PostData.append("user_id", userId);
            bg_PostData.append("visit_date", visitDate);
            bg_PostData.append("country_name", country);
            bg_PostData.append("blog_title", title);
            bg_PostData.append("blog_content", content);

            images.forEach((img) => {
                bg_PostData.append("images",img);
            });

             console.log('blog post data',bg_PostData);

            const response = await axios.post("http://localhost:5050/api/TravelTales/blog/updatePosts",bg_PostData,{
                headers: {
                    "Content-Type" : "multipart/form-data",
                },

            });

            if(response.status === 200){
                toast.success("Blog Post Updated");

                
                setVisitDate('');
                setContent('');
                setCountry('');
                setImages([]);
                setTitle('');
                modalClose();
            }
        }catch(err){
            console.error(err);
            toast.error("failed to update blog post");
            

        }


    };

    // const changeModal = () =>{
    //     modalClose();
    //     setShowRegisterModal(true);
        
    // };

    const clearTextFieldData =()=>{
       
        setVisitDate('');
        setContent('');
        setCountry('');
        setImages([]);
        setTitle('');
        modalClose();

    };


   


    return(
        <>
        <Modal show={show} onHide={clearTextFieldData} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center mb-1"> Edit Blog Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                    <Form onSubmit={post} >
                        <Row>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="mt-4">Date of Visit</Form.Label>
                                    <Form.Control className=" mb-4" type="date" value={visitDate} onChange={(e)=> setVisitDate(e.target.value)} />   
                                </Form.Group>
                              </Col>
                            <Col md={4}>
                                <Form.Group className="mt-4 ">
                                    <Form.Label> Select Country </Form.Label>
                                    <Form.Select value={country} onChange={(e)=> setCountry(e.target.value)}>
                                        <option value=""> Select Country</option> 
                                        {countryDropdown.map((c,index)=> (
                                            <option key={index} value={c.country_name}>{c.country_name}</option>
                                        ))}
                                 

                                    </Form.Select>
                            </Form.Group>
                            </Col>
                        </Row>

                         <Form.Group>
                             <Form.Label>Title</Form.Label>
                            <Form.Control className="mb-3"  type= "text"  value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Enter Your Title" />
                         </Form.Group>
                                   
                         <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control className="mb-3" as= "textarea" rows={8}  value={content} onChange={(e)=> setContent(e.target.value)} placeholder="Write Your Blog Content" />
                         </Form.Group>
                         {/* view chosen images  */}
                         <div className="mb-3">
                            {images.length > 0 && (
                                <div className="d-flex flex-wrap gap-2">
                                    {images.map((img,index)=>(
                                        <img key={index} src={URL.createObjectURL(img)} alt={`preview-${index}` } style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                                    ))}
                                </div>
                            )}

                         </div>

                         <Form.Group controlId="formFileMultiple" className="mb-3">
                              <Form.Label>Selected Pictures</Form.Label>
                              <Form.Control className="d-none" id="imageInput" type="file" multiple onChange={changeImages} accept="image/*" />


                         </Form.Group>
                
                        <Button variant="dark" className="me-2" onClick={()=> document.getElementById("imageInput").click()}>  Add Images  </Button>

                           
                        <ModalFooter className="justify-content-end">
                                <Button variant="primary" type="submit" className="me-2" disabled={!visitDate||!country || !title ||!content}>  Save</Button>
                                <Button variant="secondary" className="me-2" onClick={clearTextFieldData}>  Cancel </Button>
                        </ModalFooter>
                    
                    
                 
                </Form>
            </Modal.Body>
           
        </Modal>
 

        </>


    )
};

export default EditBlogPost;