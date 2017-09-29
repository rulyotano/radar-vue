import httpService from '~/services/http-service'
import helperService from '~/services/helper-service'
import _ from 'lodash'

const service = {
    details(artistId){
        let params = {
            id: artistId
        };
        return httpService.get(`api/artist/details`, params).then(response=>response ? response.Data : null);
    }
};

export default service;