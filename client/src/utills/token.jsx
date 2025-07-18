// import {jwtDecode} from 'jwt-decode';


export function checkUserokenValid(){
    const auth_token = localStorage.getItem('token');
   
    if(!auth_token) return false;
  

    try{
        // const {exp} = jwtDecode(auth_token);
        // return Date.now() < exp * 1000; //expires in seconds 
        const payload = JSON.parse(atob(auth_token.split('.')[1])); 
        const currentTime = Math.floor(Date.now() / 1000); 
         return payload.exp > currentTime;
       


    }catch(err){
        return false;
    }
}