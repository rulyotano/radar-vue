import * as isMobile from 'ismobilejs'
import Vuex from 'vuex'
import radarEventsService from '~/services/radar-events-service'

const checkIfMobile = (context) => {
  const userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
  return isMobile(userAgent).any
}

const _setMoreEventsBase = (stateEventsData, moreEventsData)=>{
  if (moreEventsData && moreEventsData.Data)
    return {
      ...stateEventsData,
      lastPage: moreEventsData.LastPage,
      page: moreEventsData.Page,
      total: moreEventsData.Total,
      events: [...stateEventsData.events, ...moreEventsData.Data] 
    }
  return stateEventsData
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
        artist: null,
        events: [],
        page:0,
        total: 0,
        lastPage: false,
        loadingMore: false
      },
      placeDetailsData: {
        place: null,
        events: [],
        page:0,
        total: 0,
        lastPage: false,
        loadingMore: false
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
      loadEventDetails({commit}, eventId){
        commit('setEventDetails', null)
        radarEventsService.details(eventId)
                  .then(event=> commit('setEventDetails', event))
      },

      //more events
      loadMoreEvents({commit}){
        commit('setEventLoadingMore', { loading:true })
        let filters = {...this.state.filters}
        filters.page = this.state.eventsData.page + 1
        
        return radarEventsService.list(filters)
                  .then(moreEventsData => commit('setMoreEvents', { moreEventsData }))
                  .finally(()=>commit('setEventLoadingMore', { loading:false }));
      },
      loadMoreEventsArtist({commit}, artistId){
        commit('setEventLoadingMore', { loading:true, source: 'artist' })
        let args = { page: this.state.artistDetailsData.page + 1, pageSize: 8, artistId }
        
        return radarEventsService.list(args)
                  .then(moreEventsData => commit('setMoreEvents', { moreEventsData, source: 'artist' }))
                  .finally(()=>commit('setEventLoadingMore', { loading:false, source: 'artist' }));
      },
      loadMoreEventsPlace({commit}, placeId){
        commit('setEventLoadingMore', { loading:true, source: 'place' })
        let args = { page: this.state.placeDetailsData.page + 1, pageSize: 8, placeId }
        
        return radarEventsService.list(args)
                  .then(moreEventsData => commit('setMoreEvents', { moreEventsData, source: 'place' }))
                  .finally(()=>commit('setEventLoadingMore', { loading:false, source: 'place' }));
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

      setMoreEvents(state, { moreEventsData, source = "events"}){
        switch (source){
          case "events":
            state.eventsData = _setMoreEventsBase(state.eventsData, moreEventsData)
            break
          case "artist":
            state.artistDetailsData = _setMoreEventsBase(state.artistDetailsData, moreEventsData)
            break
          case "place":
            state.placeDetailsData = _setMoreEventsBase(state.placeDetailsData, moreEventsData)
            break
        }        
      },

      setEventLoading(state, loading){
        state.eventsData.loading = loading;      
      },
      setEventLoadingMore(state, { loading, source = "events" }){
        switch (source){
          case "events":
            state.eventsData.loadingMore = loading
            break
          case "artist":
            state.artistDetailsData.loadingMore = loading
            break
          case "place":
            state.placeDetailsData.loadingMore = loading
            break
        }
      },
      setEventDetails(state, event){
        state.eventDetailsData.event = event;
      },
      setArtistDetails(state, artist){
        state.artistDetailsData.artist = artist;
        if (artist){
          state.artistDetailsData.events = artist.Events
          state.artistDetailsData.lastPage = artist.LastEventsPage
          state.artistDetailsData.page = 0
        }
      },
      setPlaceDetails(state, place){
        state.placeDetailsData.place = place;
        if (place){
          state.placeDetailsData.events = place.Events
          state.placeDetailsData.lastPage = place.LastEventsPage
          state.placeDetailsData.page = 0
        }
      },
      setFilters(state, newFilters){
        state.filters = newFilters
      }
    }
  })
  return store;
}

export default createStore