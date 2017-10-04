import axios from 'axios'
import configService from '~/services/config-service'

const success = response => {
    return response.data;    
};

const fail = error => {
    console.log(error);
};

let apiUrl = configService.apiUrl()
let adminUrl = configService.adminUrl()

const service = {
    get(url, params){
        return axios.get(`${apiUrl}/${url}`, {params}).then(success).catch(fail);
    },
    post(url, data){
        return axios.post(`${apiUrl}/${url}`, data).then(success).catch(fail);
    },
    /**Get the create event url
     * @param artist - Create event in artist
     * @param place - Create event in place
     */
    createEventUrl(artist, place){
        let url = "/admin/#/crear-evento"
        if (artist || place)
            url += "?"
        if (artist)
            url+=`artist=${artist}`
        if (place){
            if (artist)
                url+="&"
            url+=`place=${place}`
        }
        url = url.replace(/\//g, '%2F')
        url = url.replace(/#/g, '%23')
        return `${adminUrl}/Account/Login?ReturnUrl=${url}`;
    }
};

export default service;