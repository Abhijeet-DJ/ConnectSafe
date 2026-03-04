import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : 'http://localhost:6609/api',
    withCredentials : true,
})