import React,{useState} from "react";
import {Modal,Button,Form,Row,Col, ModalFooter,Image,InputGroup} from 'react-bootstrap';
import {Eye,EyeSlash} from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import axios from "axios";
// import UserLogin from "./Login";



function UserRegister({show,modalClose,openLoginForm}){

    const [showUserPw,setShowUserPw] = useState(false);
    const [showConfirmUserPw,setShowConfirmUserPw] = useState(false);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPw,setConfirmPw] = useState('');
    // const [showLoginModal,setShowLoginModal] = useState(false);

    


    const checkEmail = (email) =>{
        return /^\S+@\S+\.\S+$/.test(email);  
    };

      const registerUser = async (e) =>{
        e.preventDefault();

        if(!username.trim() ||!email.trim() || !password.trim() ||!confirmPw.trim()){
             toast.error("Please fill required fields ");
             return;
             
        }

        if(password.length <8){
            toast.error("password must be at least 8 characters ");
            return;
        }

        if(!/[A-Z]/.test(password) || !/[0-9]/.test(password)){
            toast.error("password must contains at least one number or uppercase letter ");
            return;
        }

        if(password !== confirmPw){
           toast.error("Passwords do not match");
           return;

        }

        if(!checkEmail(email)){
             toast.error("Invalid email format");
             return;
        }

        const userData ={
            username,
            email,
            password,
        };

        console.log('register user',userData);

        try{
            const response = await axios.post("http://localhost:5050/api/TravelTales/auth/userRegister",userData);
            if(response.status === 200){
                 const {auth_token} =response.data;
                 localStorage.setItem('token',auth_token);
                 toast.success("User registered successfully");
                   // clear form after submitting 

                 setUsername('');
                 setEmail('');
                 setPassword('');
                 setConfirmPw('');

                 modalClose();
                 openLoginForm();
                 
                //  setShowLoginModal(true);

            }
          
        }catch(error){
            if(error.response?.data?.error){
                  toast.error(error.response.data.error);

            }else{
                toast.error("User registration failed. Try again.");

            }

        }
        

     
    };

    const clearTextFieldData =()=>{
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPw('');
        modalClose();

    };



    return(
        <Modal show={show} onHide={clearTextFieldData} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center"> Register</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col md={6}>
                    <Form onSubmit={registerUser}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control className="mb-4" type="text"  value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Your Username" />

                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-4" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="abcd@example.com" />

                            <Form.Label>Password</Form.Label>
                            <InputGroup className="mb-4">
                            <Form.Control  type= {showUserPw ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password" />
                            <Button variant="outline-dark" onClick={()=>setShowUserPw(!showUserPw)}>
                                {showUserPw ? <EyeSlash/> : <Eye/> }
                            </Button>

                            </InputGroup>
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup className="mb-4">
                                <Form.Control  type= {showConfirmUserPw? "text" : "password"} value={confirmPw} onChange={(e)=>setConfirmPw(e.target.value)} placeholder="Enter Your Confirm Password" />
                                <Button variant="outline-dark" onClick={()=>setShowConfirmUserPw(!showConfirmUserPw)}>
                                    {showConfirmUserPw? <EyeSlash/> : <Eye/> }
                                </Button>
                            </InputGroup>
                        </Form.Group>

                         <ModalFooter className="justify-content-center">
                                <Button variant="primary" type="submit" className="me-2">  Register </Button>
                                <Button variant="secondary" onClick={clearTextFieldData} className="me-2">  Cancel </Button>
                        </ModalFooter>
                    </Form>

                    </Col>
                    
                     <Col md={6}className="d-flex align-items-center justify-content-center">
                     <Image src="reg.jpg" alt="register" fluid style={{  height: '100%',width: 'auto', borderRadius: '10px', objectFit: 'cover' }}></Image>

                    </Col>
                </Row>
            </Modal.Body>
           
        </Modal>


    )
};

export default UserRegister;