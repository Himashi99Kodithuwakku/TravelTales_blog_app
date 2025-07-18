import React ,{useState} from "react";
import {Modal,Button,Form,Row,Col, ModalFooter,Image,InputGroup} from 'react-bootstrap';

import { toast } from 'react-toastify';
import axios from "axios";
// import {useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {Eye,EyeSlash} from 'react-bootstrap-icons';


function ForgotPWD({show,modalClose}){
    const [email,setEmail] =useState('');
    const [step,setStep]=useState(1);
    const [resetCode,setResetCode]=useState('');
    const [newPassword,setNewPassword] =useState('');
    const [confirmPw,setConfirmPw]=useState('');
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const sendEmail = async (e) =>{
        e.preventDefault();
        if(!email.trim()){
            toast.error("Please enter your email");
            return;
        }

        try{
            const response = await axios.post('http://localhost:5050/api/TravelTales/auth/forgotpwd',{email});
            if(response.status === 200){
                 toast.success("Verification code Sent! . Check Your Mail inbox");
                 setStep(2);
                 
            }
        }catch(err){
            toast.error(err.response?.data?.error || "failed  to send email for reset ");
        }

    }

    const verifyCode = async (e)=>{
        e.preventDefault();
        if(!resetCode.trim()){
            toast.error("Please enter Your 8 digit code sent to your email");
            return;
        }

        // console.log("verify-code:",email,resetCode);
        try{
            const response = await axios.post('http://localhost:5050/api/TravelTales/auth/verifyCode',{
                email,
                v_code:resetCode
            });

            if(response.status === 200){
                 toast.success("Code Verifed! Now you can  reset your Password!");
                 setStep(3);
            
            }
        }catch(err){
            toast.error(err.response?.data?.error || "Invalid code, try again");
        }

    };
    
    
    const resetPWD = async (e) => {
        e.preventDefault();

        if(!newPassword || !confirmPw){
            toast.error("Please fill required fields ");
            return;
        }
         if(newPassword.length <8){
            toast.error("password must be at least 8 characters ");
            return;
        }

        if(!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)){
            toast.error("password must contains at least one number or uppercase letter ");
            return;
        }

        if(newPassword !== confirmPw){
            toast.error("Passwords do not match");
            return;

        }
        //  console.log("email and new pw :",email,newPassword);

        try{
            const response = await axios.post('http://localhost:5050/api/TravelTales/auth/resetPassword',{
                
                email,newPassword
                
            });

            if(response.status === 200){
                toast.success("Password reset successfully!");
                setStep(1);
                setEmail('');
                setResetCode('');
                setNewPassword('');
                setConfirmPw('');
                modalClose();
            }
        }catch(err){
            toast.error(err.response?.data?.error || "Passwaord reset failed!, try again");
        }





    };

    const clearTextFieldData =()=>{
        setEmail('');
        setStep(1);
        setResetCode('');
        setNewPassword('');
        setConfirmPw('');
        modalClose();

    };

    // console.log(email,newPassword);


    

    return(
         <>
        <Modal show={show} onHide={clearTextFieldData }centered>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center mb-1"> Forgot Password </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col md={6}>
                    <Form onSubmit= {step === 1 ? sendEmail : step === 2 ?  verifyCode : resetPWD}>
                        {step === 1 && ( 
                            <>
                            <Form.Group>
                                <Form.Label className="mt-2">Email</Form.Label>
                                <Form.Control className=" mb-4" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="abcd@example.com" />                    
                            </Form.Group>
                            <ModalFooter className="justify-content-center">
                                <Form.Text className="text-muted ms-1" style={{ fontSize: '0.75rem' }}> 
                                    <FontAwesomeIcon icon={faCircleExclamation} className="me-2" /> 
                                        Click Send button to get 8 Digit code for reset password .
                                    </Form.Text>
                                <Button variant="primary" type="submit"  className="me-2">  Send </Button>
                                <Button variant="secondary" onClick={clearTextFieldData} className="me-2">  Cancel </Button>
                            </ModalFooter>
                        
                            </>
                        )} 

                        {step === 2 &&  ( 
                            <>
                            <Form.Group>
                                <Form.Label className="mt-2">Verification Code </Form.Label>
                                <Form.Control className=" mb-4" type="text" value={resetCode} onChange={(e)=>setResetCode(e.target.value)} placeholder="Enter 8 - Digit code" />                    
                            </Form.Group>
                            <ModalFooter className="justify-content-center">
                                <Button variant="primary" type="submit" className="me-2">  Verify </Button>
                                <Button variant="secondary" onClick={clearTextFieldData} className="me-2">  Cancel </Button>
                            </ModalFooter>
                            
                            
                            
                            </>
                        )} 

                        {step === 3 && (
                            <>
                            <Form.Group>
                                <Form.Label className="mt-2">New Password </Form.Label>
                                  <InputGroup className="mb-4">
                                    <Form.Control  type= {showNewPw ? "text" : "password"} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter Your Password" />
                                        <Button variant="outline-dark" onClick={()=>setShowNewPw(!showNewPw)}>
                                            {showNewPw ? <EyeSlash/> : <Eye/> }
                                        </Button>
                                    </InputGroup>
                                    <Form.Label className="mt-2">Confirm Password </Form.Label>
                                     <InputGroup className="mb-4">
                                    <Form.Control  type= {showConfirmPw ? "text" : "password"} value={confirmPw} onChange={(e)=>setConfirmPw(e.target.value)} placeholder="Enter Your Password" />
                                        <Button variant="outline-dark" onClick={()=>setShowConfirmPw(!showConfirmPw)}>
                                            {setConfirmPw ? <EyeSlash/> : <Eye/> }
                                        </Button>
                                    </InputGroup>                
                            </Form.Group>
                            <ModalFooter className="justify-content-center">
                                <Form.Text className="text-muted ms-1" style={{ fontSize: '0.75rem' }}> 
                                    <FontAwesomeIcon icon={faCircleExclamation} className="me-2" /> 
                                        Click Reset button to  reset password .
                                    </Form.Text>
                                <Button variant="primary" type="submit"  className="me-2">  Reset  </Button>
                                <Button variant="secondary" onClick={clearTextFieldData} className="me-2">  Cancel </Button>
                            </ModalFooter>

                            
                            
                            </>
                        )}
                        
                       
                    </Form>
                    </Col>
                    
                     <Col md={6}className="d-flex align-items-center justify-content-center">
                     <Image src="fgt.jpeg" alt="login" fluid style={{  height: '100%',width: 'auto', borderRadius: '10px', objectFit: 'cover' }}></Image>

                    </Col>
                </Row>
            </Modal.Body>
           
        </Modal>
        

        </>


    );


};

export default ForgotPWD;