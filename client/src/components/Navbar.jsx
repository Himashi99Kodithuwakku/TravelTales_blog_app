
import React,{useState,useEffect} from "react";
// import {Link} from 'react-router-dom';
import { Navbar, Nav, Container,Button,Form,FormControl } from 'react-bootstrap';
import UserRegister from "../modal/Register";
import UserLogin from "../modal/Login";
import { checkUserokenValid } from "../utills/token";
import { useNavigate ,useLocation} from "react-router-dom";



function NavBar() {

    const [showRegisterModal,setShowRegisterModal] = useState(false);
    const [showLoginModal,setShowLoginModal] = useState(false);
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(checkUserokenValid);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        const checkAuthToken = () =>{
            const valid = checkUserokenValid();
            setIsUserLoggedIn(valid);
            if(!valid){
                localStorage.removeItem('token');
                // toast.info("Session expired. You're logged out.");
                navigate('/');
            }
        };
        checkAuthToken();

    },[location.pathname,navigate]);

    const userLogout = () =>{
        localStorage.removeItem("token");
        setIsUserLoggedIn(false);
        navigate("/");
    };

    return(
        <>
        
        <Navbar bg="light" data-bs-theme="light" fixed="top">
            <Container>
                <Navbar.Brand href="#home">
                    <img src="logo.png" alt="logo" width="300" height="80" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-center"/>
                <Navbar.Collapse id="navbar-center" className="justify-content-center">

                     {/* check if user logged in or not  if user logged in display navigation bar with options for registered user  */}
                <Nav className ="ms auto">
                        <Nav.Link >Home</Nav.Link>
                         <Form className="d-flex ms-5" role="search">
                            <FormControl className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <Button variant="btn btn-outline-dark" type="submit">Search</Button>
                        </Form>
                </Nav>
                </Navbar.Collapse>
                
                <Nav className="ms-auto d-none d-lg-flex">
                    {isUserLoggedIn ? (
                        <>
                        <Button variant="warning" onClick={()=>navigate('/profile')} >Profile</Button>
                        <Button variant="danger mx-3" onClick={userLogout}>Logout</Button>
                        </>
                    ) : (  

                        <>
            
                        <Button variant="primary mx-3" onClick={() => setShowRegisterModal(true)}>Register</Button>
                        <Button variant="success"  onClick={() => setShowLoginModal(true)}>Login</Button>

                        </>

                    )}

                </Nav>

            </Container>
        </Navbar>

         <UserRegister show={showRegisterModal} modalClose={()=>setShowRegisterModal(false)} openLoginForm={()=>setShowLoginModal(true)} />
         <UserLogin show={showLoginModal} modalClose={()=>setShowLoginModal(false)} />
        </>

        
    );
}

export default NavBar;
