import React,{useState} from "react";
import {Modal,Button,Form,Row,Col, ModalFooter,Image,InputGroup} from 'react-bootstrap';
import {Eye,EyeSlash} from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import axios from "axios";
import UserRegister from "./Register";
import {useNavigate } from 'react-router-dom';
import ForgotPWD from "./ForgotPW";



function UserLogin({show,modalClose}){

    const [showUserPw,setShowUserPw] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showRegisterModal,setShowRegisterModal] = useState(false);
    const [showForgotPWDModal,setShowForgotPWDModal] = useState(false);
    const navigate = useNavigate();



      const loginUser = async (e) =>{
        e.preventDefault();

        if(!email.trim()){
            toast.error("Please enter your email");
            return;
             
        }

        if(!password.trim()){
            toast.error("Please enter your password");
            return;
             
        }

        const userData ={
            email,
            password,
        };

        console.log('login user',userData);

        try{
            const response = await axios.post("http://localhost:5050/api/TravelTales/auth/userLogin",userData);
            if(response.status === 200){
                 const {auth_token,user_id,username,email} =response.data;
                
                 localStorage.setItem('token',auth_token);
                 localStorage.setItem('user', JSON.stringify({user_id,username,email}));

                toast.success("User Login Successful");
                 setEmail('');
                 setPassword('');
                 modalClose();
                 navigate('/user');
                //  navigate('/');
                //  openLoginForm();
                //  setShowLoginModal(true);


               // clear form after submitting 

            }
          
        }catch(error){
            if(error.response?.data?.error){
                  toast.error(error.response.data.error);

            }else{
                toast.error("User login failed. Try again.");

            }

        }
        

     
    };

    const changeModal = () =>{
        modalClose();
        setShowRegisterModal(true);
        
    };

    const clearTextFieldData =()=>{
        setEmail('');
        setPassword('');
        modalClose();

    };


   


    return(
        <>
        <Modal show={show} onHide={clearTextFieldData} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center mb-1"> Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col md={6}>
                    <Form onSubmit={loginUser}>
                        <Form.Group>
                           
                            <Form.Label className="mt-4">Email</Form.Label>
                            <Form.Control className=" mb-4" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="abcd@example.com" />

                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-4">
                            <Form.Control  type= {showUserPw ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password" />
                            <Button variant="outline-dark" onClick={()=>setShowUserPw(!showUserPw)}>
                                {showUserPw ? <EyeSlash/> : <Eye/> }
                            </Button>

                            </InputGroup>
                            <div className="mt-3 text-center">
                                <h6 className="fw-light">Don't have an account ? <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} onClick={changeModal}><b>Register</b></span> </h6>
                                <p className="fw-light " style={{ color: "black", cursor: "pointer", textDecoration: "underline" }} onClick={()=> {clearTextFieldData(); setShowForgotPWDModal(true)}}>  forgot password? </p>
                             </div>
                        
                        </Form.Group>
                         <ModalFooter className="justify-content-center">
                                <Button variant="primary" type="submit" className="me-2">  Login </Button>
                                <Button variant="secondary" onClick={clearTextFieldData} className="me-2">  Cancel </Button>
                        </ModalFooter>
                    </Form>
                    </Col>
                    
                     <Col md={6}className="d-flex align-items-center justify-content-center">
                     <Image src="login.jpeg" alt="login" fluid style={{  height: '70%',width: 'auto', borderRadius: '10px', objectFit: 'cover' }}></Image>

                    </Col>
                </Row>
            </Modal.Body>
           
        </Modal>
        <UserRegister show={showRegisterModal} modalClose={()=>setShowRegisterModal(false)} />
        <ForgotPWD show={showForgotPWDModal} modalClose={()=>setShowForgotPWDModal(false)} />

        </>


    )
};

export default UserLogin;