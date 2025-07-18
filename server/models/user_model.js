const db = require('../database/table');

require('dotenv').config();


const getUserEmail = (email,callback) => {
    const getEmailQuery =  `SELECT * FROM users WHERE email = ?`;
    db.get(getEmailQuery,[email],callback);
}

const newUser = (user, callback) =>{
    const insertQuery = `INSERT INTO users(user_id,username,email,password)
                         VALUES (?, ?, ?,? )
                        `;
    db.run(insertQuery,[user.user_id,user.username,user.email,user.password],callback);

};

const updatePassword = (email,pw_hashed, callback)=>{
    const updatePwQuery =` UPDATE users SET password = ? , active = 1 WHERE email = ?`;
    db.run(updatePwQuery,[pw_hashed,email],callback);


};

const getUserByID = (user_id,callback)=>{
    const getUserNameQuery =`SELECT user_id, username  FROM users WHERE user_id = ?`;
    db.get(getUserNameQuery,[user_id,],callback);
};





module.exports ={getUserEmail,newUser,updatePassword,getUserByID};