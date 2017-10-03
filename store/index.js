import * as isMobile from 'ismobilejs'
import Vuex from 'vuex'
import radarEventsService from '~/services/radar-events-service'

const checkIfMobile = (context) => {
  const userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
  return isMobile(userAgent).any
}

const createStore = () => {
  let store = new Vuex.Store({
    state: {
      isMobile: false,
      hightlights: [],  //list of hight light events
      eventsData: {
        page: 0,
        total: 0,
        lastPage: false,
        events: [],
        loading: false,
        loadingMore: false
      },
      eventDetailsData: {
        event: null
      },
      artistDetailsData: {
        artist: null
      },
      placeDetailsData: {
        place: null
      },
      filters: {
        time_s: undefined,
        time_e: undefined,
        cover_max: undefined,
        cover_min: undefined,
        date: undefined,
        loc: undefined,
        q: undefined,
        cat: undefined
      }
    },
    getters: {
      isMobile: state => state.isMobile
    },
    actions: {
      async nuxtServerInit ({commit, dispatch}, context) {
        commit('changeMobile', checkIfMobile(context));
        await dispatch('load');
      },
      load({dispatch}){
        return Promise.all([
          dispatch('loadHightlights')
        ])
      },
      loadHightlights({commit}){
        return radarEventsService.hightlights().then(hightlights => commit('setHightlights', hightlights))
      },
      loadEvents({commit}){
        commit('setEventLoading', true)        
        let filters = this.state.filters
        filters.page = 0
        return radarEventsService.list(filters)
                  .then(eventsData => commit('setEvents', eventsData))
                  .finally(()=>commit('setEventLoading', false));
      },
      loadMoreEvents({commit}){
        commit('setEventLoadingMore', true)
        let filters = this.state.filters
        filters.page = this.state.eventsData.page + 1
        
        return radarEventsService.list(this.state.filters)
                  .then(moreEventsData => commit('setMoreEvents', moreEventsData))
                  .finally(()=>commit('setEventLoadingMore', false));

        return radarEventsService.list()
      },
      loadEventDetails({commit}, eventId){
        commit('setEventDetails', null)
        radarEventsService.details(eventId)
                  .then(event=> commit('setEventDetails', event))
      }
    },
    mutations: {
      changeMobile (state, isMobile) {
        state.isMobile = isMobile
      },
      setHightlights(state, hightlights){
        state.hightlights = hightlights
      },
      setEvents(state, eventsData){
        if (eventsData && eventsData.Data)
          state.eventsData = {
            ...state.eventsData,
            lastPage: eventsData.LastPage,
            page: eventsData.Page,
            total: eventsData.Total,
            events: eventsData.Data
          }
      },
      setMoreEvents(state, moreEventsData){
        if (moreEventsData && moreEventsData.Data)
          state.eventsData = {
            ...state.eventsData,
            lastPage: moreEventsData.LastPage,
            page: moreEventsData.Page,
            total: moreEventsData.Total,
            events: [...state.eventsData.events, ...moreEventsData.Data] 
          }
      },
      setEventLoading(state, loading){
        state.eventsData.loading = loading;      
      },
      setEventLoadingMore(state, loading){
        state.eventsData.loadingMore = loading;
      },
      setEventDetails(state, event){
        state.eventDetailsData.event = event;
      },
      setArtistDetails(state, artist){
        state.artistDetailsData.artist = artist;
      },
      setPlaceDetails(state, place){
        state.placeDetailsData.place = place;
      },
      setFilters(state, newFilters){
        state.filters = newFilters
      }
    }
  })
  return store;
}

export default createStore