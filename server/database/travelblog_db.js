const sqlite  = require('sqlite3').verbose();
const path = require('path');

// create travel tales blog.db  database and  db connetion
 const travelTalesdb =  path.resolve(__dirname,'tb.db');

 const db = new sqlite.Database(travelTalesdb,(err) =>{
    if(err){
        console.error('Error occured opeining  travel tales blog app database',err.message);
    }else{
        console.log(" travel tales database connected successfully !..");
    }
 });


 module.exports =db;