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
        return `${process.env.adminUrl}/Account/Login?ReturnUrl=${url}`;
    }
};

export default service;