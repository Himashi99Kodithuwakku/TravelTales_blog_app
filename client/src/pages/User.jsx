import React  from "react";
import {Container, Row,Col,Card} from 'react-bootstrap';
// import { checkUserokenValid } from "../utills/token";
// import { useNavigate ,useLocation} from "react-router-dom";

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faEarthAsia} from '@fortawesome/free-solid-svg-icons';
// import Footer from "../components/footer";
// import UserRegisterModal from "../modal/Regitser";
// import UserLoginModal from "../modal/Login";

function User(){
    // const [showRegisterModal,setShowRegisterModal] = useState(false);
    // const [showLoginModal,setShowLoginModal] = useState(false);
    // const [isUserLoggedIn,setIsUserLoggedIn] = useState(checkUserokenValid);

    // useEffect(()=>{
    //     const checkAuthToken = () =>{
    //         const valid = checkUserokenValid();
    //         setIsUserLoggedIn(valid);
    //         if(!valid){
    //             localStorage.removeItem('token');
    //             // toast.info("Session expired. You're logged out.");
    //             navigate('/');
    //         }
    //     };
    //     checkAuthToken();
    
    // },[location.pathname,navigate]);
    


    return(
        <>
        
        <div className="d-flex flex-column">
             <Container className="pt-5 mt-5">
             
            
            

        </Container>
         <div className="cards">
            <Row className="g-4 px-4">
               
                   <Col md={6}>
                <Card className="h-100  mx-3 shadows-sm" border="primary">
                    <Card.Body>
                        <Card.Title > User User</Card.Title>
                        <Card.Text>Includes secure user authentication using:
                             <div className="my-4"></div>

                        <ul style={{listStyleType:"square"}}>
                            <li>User registration with hased passwords</li>
                            <li>Secure login</li>
                            <li>Authentication required to access protected data</li>
                            <li>Prevention of unauthroized access</li>
                        </ul>
                        
                        </Card.Text>

                    </Card.Body>
                </Card>
                </Col>

                
            </Row>
            
        </div>
         {/* <Footer/> */}
        
        </div>
        {/* <UserRegisterModal show={showRegisterModal} modalClose={()=>setShowRegisterModal(false)} openLoginForm = {() => setShowLoginModal(true)}/>
        <UserLoginModal show={showLoginModal} modalClose={()=>setShowLoginModal(false)}/> */}

        </>
        
       

       



       
    );


}

export default User;