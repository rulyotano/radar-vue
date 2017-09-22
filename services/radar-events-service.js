import httpService from '~/services/http-service'

const service = {
    hightlights(){
        return httpService.get(`/Admin/Event/HighlightEvents`).then(response=>response.Data);
    }
};

export default service;