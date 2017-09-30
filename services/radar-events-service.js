import httpService from '~/services/http-service'
import helperService from '~/services/helper-service'
import _ from 'lodash'

const service = {
    hightlights(){
        return httpService.get(`api/event/highlights`).then(response=>response.Data);
    },
    list(filters = {}){
        let params = {
            model: {
                page: filters.page || 0,
                pageSize: filters.pageSize || 12,                 
            }
        };
        return httpService.get(`api/event/list`, params);
    },
    details(eventId){
        let params = {
            id: eventId
        };
        return httpService.get(`api/event/details`, params).then(response=>response.Data);
    },
    urlDescription: event => helperService.urlDescription(event.Name),
    getImage: (e, priority) => {
        if (!e)
            return null;

        if (e.Image)
            return e.Image;

        if (priority === 'place' && e.Place.Image)
            return e.Place.Image;

        if (e.Artists && e.Artists.length && e.Artists[0].Image)
            return e.Artists[0].Image;

        return e.Place ? e.Place.Image : null;
    }
};

export default service;