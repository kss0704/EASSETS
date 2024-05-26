import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS} from '../constants/config';


const URL ='http://localhost:8000';


export const addAsset = async (data) => {
    try{
        return await axios.post(URL+`/add`,data);
    }
    catch(error){
        console.log("Error while calling Add Asset API:",error);
    }
}

export const getAssets = async ()=>{
    try{
        return await axios.get(URL);
    }catch(error){
        console.log("Error while calling getAssets API",error)
    }
}

export const deleteAsset = async (id) => {
    try{
        return await axios.delete(`${URL}/${id}`);
    }
    catch(error)
    {
        console.log("Error while calling delete User API",error)
    }
}

export const getAsset = async (id) =>{
    try{
        return await  axios.get(`${URL}/${id}`);
    }
    catch(error){
        console.log('Error while calling Getasset Api',error); 
    }
}

export const editAsset = async (user ,id) =>{
    try{
        return await axios.put(`${URL}/${id}`,user);
    }catch(error){
        console.log("Error while calling editAsset Api",error);
    }
}

const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 10000,
    headers:{
        "content-type" : "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response) {
        return ProcessResponse(response);
    },
    function(error)
    {
        return Promise.reject(ProcessError(error))
    }
)


const ProcessResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const ProcessError = async (error) => {
    if (error.response) {  
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if (error.request) { 
        
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else { 
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export {API}