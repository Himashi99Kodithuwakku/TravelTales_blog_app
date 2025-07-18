const axios = require("axios");
require("dotenv").config();

const getCountries = async (req,res) => {
    try{
        const response = await axios.get(process.env.REST_COUNTRY_SECURE_URL,{
            headers:{
                "x-api-key" : process.env.REST_COUNTRY_API
            }
        });

        res.status(200).json(response.data);
        console.log("REST_COUNTRY_SECURE_URL:", process.env.REST_COUNTRY_SECURE_URL);

    }catch(error){
        console.error("fetching Country data failed",error);
        res.status(500).json({error: "Failed to load countries"});
    }

};

module.exports={ getCountries};
