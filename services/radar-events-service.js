import httpService from '~/services/http-service'
import _ from 'lodash'

const service = {
    hightlights(){
        return httpService.get(`/api/event/highlights`).then(response=>response.Data);
    },
    list(filters = {}){
        let params = {
            model: {
                page: filters.page || 0,
                pageSize: 12,                 
            }
        };
        return httpService.get(`/api/event/list`, params);
    },
    urlDescription: event => _.kebabCase(_.deburr(_.truncate(event.Name, { omission: '', length: 40 }))),
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