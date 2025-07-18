const jwtoken = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req,res,next)=>{
    const auth_token = req.headers.authorization?.split(' ')[1];
    if(!auth_token){
        return res.status(403).json({error:"Token Missing.."});

    }

    jwtoken.verify(auth_token,process.env.JWTOKEN_SECRETKEY ,(err,decoded)=>{
        if(err){
            return res.status(401).json({error:"Invalid Token"});
        }
        req.user = decoded;
        next();
    });

};

module.exports = authMiddleware;