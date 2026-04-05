import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : 'http://localhost:11114/v1/',
    withCredentials : true,
})