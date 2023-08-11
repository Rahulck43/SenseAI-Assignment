import axios from "axios";



const apiInstance = axios.create({
    baseURL: 'https://www.euphoriashop.live/api', 
    withCredentials:true
  });
  
  export default apiInstance;