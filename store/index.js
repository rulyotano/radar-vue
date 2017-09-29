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
        pageSize: 0,
        events: [],
        loading: false
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
        cat: undefined,
        page: undefined
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
        return radarEventsService.list(this.state.filters)
                  .then(eventsData => commit('setEvents', eventsData))
                  .finally(()=>commit('setEventLoading', false));
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
            page: eventsData.Page,
            total: eventsData.Total,
            pageSize: eventsData.PageSize,
            events:  eventsData.Data
          }
      },
      setEventLoading(state, loading){
        state.eventsData.loading = loading;
      },
      setEventDetails(state, event){
        state.eventDetailsData.event = event;
      },
      setArtistDetails(state, artist){
        state.artistDetailsData.artist = artist;
      },
      setPlaceDetails(state, place){
        state.placeDetailsData.place = place;
      }
    }
  })
  return store;
}

export default createStore