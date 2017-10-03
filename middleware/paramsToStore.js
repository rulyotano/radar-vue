import filtersService from '~/services/filters-service'
export default function ({ route, store }) {
    store.commit('setFilters', filtersService.mapParamsToFilters(route.query))
    // console.log(route)
  }