import axios from "axios";
const access_token = localStorage.getItem('accessoken')
export const AxiosClient = axios.create({

    baseURL:'http://localhost:3012',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${access_token}`
    }

})