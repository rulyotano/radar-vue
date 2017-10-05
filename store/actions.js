import * as isMobile from 'ismobilejs'
import * as types from '~/store/action-types'
import radarEventsService from '~/services/radar-events-service'

import { CHANGE_MOBILE, SET_HIGHTLIGHTS, SET_EVENT_LOADING, SET_EVENTS, SET_EVENT_DETAILS, 
    SET_ARTIST_DETAILS, SET_EVENT_LOADING_MORE, SET_MORE_EVENTS, EVENT_SOURCES } from '~/store/mutation-types'

const checkIfMobile = (context) => {
    const userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
    return isMobile(userAgent).any
    }

export default {
    async nuxtServerInit ({commit, dispatch}, context) {
      commit(CHANGE_MOBILE, checkIfMobile(context));
      await dispatch(types.LOAD);
    },

    [types.LOAD]({dispatch}){
      return Promise.all([
        dispatch(types.LOAD_HIGHTLIGHTS)
      ])
    },

    [types.LOAD_HIGHTLIGHTS]({commit}){
      return radarEventsService.hightlights().then(hightlights => commit(SET_HIGHTLIGHTS, hightlights))
    },

    [types.LOAD_EVENTS]({commit}){
      commit(SET_EVENT_LOADING, true)        
      let filters = this.state.filters
      filters.page = 0
      return radarEventsService.list(filters)
                .then(eventsData => commit(SET_EVENTS, eventsData))
                .finally(()=>commit(SET_EVENT_LOADING, false));
    },

    [types.LOAD_EVENT_DETAILS]({commit}, eventId){
      commit(SET_EVENT_DETAILS, null)
      radarEventsService.details(eventId)
                .then(event=> commit(SET_EVENT_DETAILS, event))
    },

    //more events
    [types.LOAD_MORE_EVENTS]({commit}){
      commit(SET_EVENT_LOADING_MORE, { loading:true })
      let filters = {...this.state.filters}
      filters.page = this.state.eventsData.page + 1
      
      return radarEventsService.list(filters)
                .then(moreEventsData => commit(SET_MORE_EVENTS, { moreEventsData }))
                .finally(()=>commit(SET_EVENT_LOADING_MORE, { loading:false }));
    },

    [types.LOAD_MORE_EVENTS_ARTIST]({commit}, artistId){
      commit(SET_EVENT_LOADING_MORE, { loading:true, source: EVENT_SOURCES.ARTIST })
      let args = { page: this.state.artistDetailsData.page + 1, pageSize: 8, artistId }
      
      return radarEventsService.list(args)
                .then(moreEventsData => commit(SET_MORE_EVENTS, { moreEventsData, source: EVENT_SOURCES.ARTIST }))
                .finally(()=>commit(SET_EVENT_LOADING_MORE, { loading:false, source: EVENT_SOURCES.ARTIST }));
    },

    [types.LOAD_MORE_EVENTS_PLACE]({commit}, placeId){
      commit(SET_EVENT_LOADING_MORE, { loading:true, source: EVENT_SOURCES.PLACE })
      let args = { page: this.state.placeDetailsData.page + 1, pageSize: 8, placeId }
      
      return radarEventsService.list(args)
                .then(moreEventsData => commit(SET_MORE_EVENTS, { moreEventsData, source: EVENT_SOURCES.PLACE }))
                .finally(()=>commit(SET_EVENT_LOADING_MORE, { loading:false, source: EVENT_SOURCES.PLACE }));
    }
  }