const express = require('express');
const  cors = require('cors');
const path = require('path');
const auth_routes = require('./routes/auth');
const blog_routes = require('./routes/blog');
const country_routes = require('./routes/country');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// for image access 
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/api/TravelTales/auth',auth_routes);
app.use('/api/TravelTales/blog',blog_routes);
app.use('/api/TravelTales/country',country_routes);



app.get('/', (req, res) => {
  res.json({ message: "Travel Tales Blog API running..." });
});

app.listen(PORT,()=>{
    console.log(`Travel Blog app running on http://localhost:${PORT}`);
})