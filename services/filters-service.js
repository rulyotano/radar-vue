import searchConstantsService from '~/services/search-constants-service'
import dateService from '~/services/date-service'
const service = {
    mapParamsToFilters(routeParams){
        let result = {}
        if (routeParams.date)
            result.date = routeParams.date*1
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
        return params;
    },
    getDateRange: function (dateFilter) {
        var dIndex = dateFilter;
        var date = searchConstantsService.getDateOption(dIndex);

        var begin = date.begin, end = date.end;

        if (begin == null && end == null)
            return null;

        var stateUtc = process.env.locationUtc;

        var beginF = begin != null ? dateService.dateValueUtcOffet(begin, stateUtc) : null,
            endF = end != null ? dateService.dateValueUtcOffet(end, stateUtc) : null;

        return { begin: beginF, end: endF }
    }
}

export default service