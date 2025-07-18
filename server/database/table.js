const db  = require('./travelblog_db');


// create required tables 

const  users_table =`

    CREATE TABLE IF NOT EXISTS users (

        user_id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        active INTEGER NOT NULL DEFAULT 1,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP

    );
`;
 // log for reset passwords
const  user_details_table = `
    CREATE TABLE IF NOT EXISTS users_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);
     )`;

const blog_post_table =  `
    CREATE TABLE IF NOT EXISTS blog_posts(
        blog_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        blog_title TEXT NOT NULL,
        blog_content TEXT NOT NULL,
        images TEXT,
        country_name TEXT NOT NULL,
        date_of_visit DATETIME NOT NULL,
        blog_active INTEGER NOT NULL DEFAULT 1,
        blog_post_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        blog_post_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);
         )`;

const folower_following_table =`

        CREATE TABLE IF NOT EXISTS follows (
            id TEXT PRIMARY KEY,
            follower_id TEXT NOT NULL,
            following_id TEXT NOT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE
            FOREIGN KEY (following_id) REFERENCES users(user_id) ON DELETE CASCADE
            UNIQUE(follower_id, following_id)
        )`;


db.serialize(()=>{
    db.run(users_table,(err)=>{
        if (err){
            console.error("Error creating user table :",err.message);
        }else
            console.log("User table created.. ");
    });

     db.run(user_details_table,(err)=>{
        if (err){
            console.error("Error creating user details table :",err.message);
        }else
            console.log("User details table created.. ");
    });

     db.run(blog_post_table,(err)=>{
        if (err){
            console.error("Error creating blog post details table :",err.message);
        }else
            console.log("blog post table created.. ");
    });

     db.run(folower_following_table,(err)=>{
        if (err){
            console.error("Error creating follower following  details table :",err.message);
        }else
            console.log("followers table created.. ");
    });


    
});



module.exports = db;