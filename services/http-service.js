import axios from 'axios'

const success = response => {
    return response.data;    
};

const fail = error => {
    console.log(error);
};

const service = {
    get(url, params){
        return axios.get(`${process.env.apiUrl}/${url}`, {params}).then(success).catch(fail);
    },
    post(url, data){
        return axios.post(`${process.env.apiUrl}/${url}`, data).then(success).catch(fail);
    }
};

export default service;