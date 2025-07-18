const jwtoken= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4} = require('uuid');
const {newUser,getUserEmail,updatePassword,getUserByID} = require('../models/user_model');
const nodemailer = require('nodemailer');

const resetCodes = {};
require("dotenv").config();

// user register
const userRegister = (req,res) =>{
    const { username,email,password} = req.body;

    if(!username || !email || !password){
         return res.status(400).json({error: "All field a required"});
    }
       
    getUserEmail(email,(err,user)=> {
        if(err){
             return res.status(500).json({error:"Database Error"});
        }
        if(user){
            return res.status(409).json({error:"Email already exists"});
        }
        const user_id =  "user" + uuidv4().slice(0,4).toUpperCase();
        bcrypt.hash(password,10,(err,pw_hashed) => {
            if(err){
                 return res.status(402).json({error:"Password hasing failed !"});
            }
            const new_user = {user_id,username,email,password:pw_hashed};
            newUser(new_user,(err) => {
                if(err){
                    return res.status(500).json({error:"User creation failed.!"});
                }else{
                    res.status(200).json({message:"User Registration  Success..!"})
                }
                
            });

        });
            
    });
};


// user login

const userLogin = (req,res) =>{
    const {email,password} = req.body;
    if(!email ||!password){
         return res.status(400).json({error: "Email and Password required"});
    }

    getUserEmail(email,(err,user)=>{
        if(err){
            return res.status(500).json({error:"Database Error"});
        }
        if(!user){
            return res.status(401).json({error:"Invalid credentials"});
        }

        bcrypt.compare(password,user.password,(err,match)=>{
            if(err){
                return res.status(500).json({error:"Database Error"});
            }
            if(!match){
                return res.status(401).json({error:"Invalid credentials"});
            }

            const auth_token = jwtoken.sign({user_id:user.user_id,email:user.email},process.env.JWTOKEN_SECRETKEY,{
                expiresIn:"1h"
            });


            return res.status(200).json({message:"Login Successful",auth_token, user_id:user.user_id,username:user.username,email:user.email});

        });
    });

};
     // generate eight digit code
 const generateCode =()=>{
    
    return Math.floor(10000000 + Math.random() * 90000000).toString();
 }


const sendEmail = async (req,res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({error:'Email is required'});
    } 

    getUserEmail(email,async (err,user)=>{
        if(err){
            return res.status(500).json({error:"Database Error"});
        }

        if(!user){
            return res.status(404).json({error:"User not found with this email"});
        }
      
        const resetCode = generateCode();
        // store verification code
        resetCodes[email] =resetCode;


        const transport_email = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });


        // options for reset password 
        const resetPw_op = {
            from:process.env.EMAIL_USER,
            to:email,
            subject: 'TRAVEL TALES -Verification CODE Reset your Password!',
            html: `<p> Enter the following <b> 8 Digit code </b> to reset your password.</p>
                    <h3 style="color:red; font-size:24px; letter-spacing:2px;">
                    ${resetCode}</h3><br>
                    <p>Copy the CODE and past it into the verification field.</p>`
        };

        try{
            await transport_email.sendMail(resetPw_op);
            console.log('reset code:' ,resetCode);
            res.status(200).json({message:" Reset Code sent to your mail!"});

        }catch(error){
            console.error(' Sending error ',error);
            res.status(500).json({error:" Sending failure !"});

        }

    });


};


const verifyResetCode = (req,res) =>{
    const { email,v_code } = req.body;

    if(!email || !v_code){
         return res.status(400).json({error:'Email and verification code required'});

    }

    const storedCode = resetCodes[email];

    if(!storedCode){
        return res.status(400).json({error:'No reset request found for this email'});

    }
    if(storedCode !== v_code){
         return res.status(401).json({error:'Invalid verification code , enter correct code'});
    }

    // remove stored code after verification
    delete resetCodes[email];
    return res.status(200).json({message:'Code verified . Now You can reset your password'});


};

const resetPassword =(req,res) =>{
    const {email,newPassword} = req.body;

    if(!email || !newPassword){
        return res.status(400).json({error:'Email and new Password required'});
    }

    bcrypt.hash(newPassword,10,(err,pw_hashed) => {
        if(err){
            return res.status(500).json({error:"Password hashing failed "});
        }
        updatePassword(email,pw_hashed,(err)=>{
            if(err){
                return res.status(500).json({error:"Failed to update password"});
            }

            res.status(200).json({message:" New Password updated successfully "});

        });
    });



};

const getUsername = (req,res)=>{
    const user_id = req.params.id;
    getUserByID(user_id,(err,user)=>{
         if(err){
            return res.status(500).json({error:"Database Error"});
        }
        if(!user){
            return res.status(404).json({error:"Useer not found"});
        }

        res.status(200).json(user);

    })

}

module.exports = {userRegister,userLogin,sendEmail,verifyResetCode,resetPassword,getUsername};