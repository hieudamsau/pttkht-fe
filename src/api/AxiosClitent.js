import axios from "axios";
let access_token = localStorage.getItem('access_token')
export const AxiosClient = axios.create({

    baseURL:'http://localhost:3012',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${access_token}`
    }

})