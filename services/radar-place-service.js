import httpService from '~/services/http-service'
import helperService from '~/services/helper-service'
import _ from 'lodash'

const service = {
    details(placeId){
        let params = {
            id: placeId
        };
        return httpService.get(`api/place/details`, params).then(response=>response ? response.Data : null);
    },
    getFullAddress : function(place) {
        if (!place || !place.Address)
            return "";
        var address = place.Address;

        address += place.Municipality ? ", " + place.Municipality.Name : "";
        address += place.State ? ", " + place.State.Name : "";
        address += place.Country ? ", " + place.Country.Name : "";

        return address;
    }
};

export default service;