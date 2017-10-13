import searchConstantsService from '~/services/search-constants-service'
import dateService from '~/services/date-service'
import configService from '~/services/config-service'

const service = {
    mapParamsToFilters(routeParams){
        let result = {}
        if (routeParams.date)
            result.date = routeParams.date*1
        if (routeParams.loc)
            result.loc = routeParams.loc
        if (routeParams.cat)
            result.cat = routeParams.cat
        if (routeParams.q)
            result.q = routeParams.q
        return result
    },
    mapFiltersToRequestArgs(filters){
        let params = {
            model: {
                page: filters.page || 0,
                pageSize: filters.pageSize || 12,                 
            }
        };
        if (filters.date){
            params.model.date = service.getDateRange(filters.date)
        }
        if (filters.placeId)
            params.model.placeId = filters.placeId
            
        if (filters.artistId)
            params.model.artistId = filters.artistId
            
        if (filters.loc)
            params.model.location = filters.loc
            
        if (filters.cat)
            params.model.category = filters.cat
            
        if (filters.q)
            params.model.query = filters.q

        return params;
    },
    getDateRange(dateFilter) {
        var dIndex = dateFilter;
        var date = searchConstantsService.getDateOption(dIndex);

        var begin = date.begin, end = date.end;

        if (begin == null && end == null)
            return null;

        var stateUtc = configService.locationUtc();

        var beginF = begin != null ? dateService.dateValueUtcOffet(begin, stateUtc) : null,
            endF = end != null ? dateService.dateValueUtcOffet(end, stateUtc) : null;

        return { begin: beginF, end: endF }
    },
    setFilters(router, route, filters){
        // console.log(router)
        router.push({ path: '/', query: {...route.query, ...filters } })  
    }
}

export default service