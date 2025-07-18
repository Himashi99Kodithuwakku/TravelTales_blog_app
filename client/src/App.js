
import React from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/Home';
import Profile from './pages/Profile';
import User from './pages/User';


function App() {
  return(
    <>
      <Router>
        <NavBar/>
        <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/user" element={<User/>}/>
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </>
  )

}

export default App;
