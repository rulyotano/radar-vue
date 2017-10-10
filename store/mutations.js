import * as types from '~/store/mutation-types'
let { EVENT_SOURCES } = types

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


export default {
    [types.CHANGE_MOBILE] (state, isMobile) {
      state.isMobile = isMobile
    },
    [types.SET_HIGHTLIGHTS](state, hightlights){
      state.hightlights = hightlights
    },
    [types.SET_EVENTS](state, eventsData){
      if (eventsData && eventsData.Data)
        state.eventsData = {
          ...state.eventsData,
          lastPage: eventsData.LastPage,
          page: eventsData.Page,
          total: eventsData.Total,
          events: eventsData.Data
        }
    },

    [types.SET_MORE_EVENTS](state, { moreEventsData, source = EVENT_SOURCES.EVENTS}){
      switch (source){
        case EVENT_SOURCES.EVENTS:
          state.eventsData = _setMoreEventsBase(state.eventsData, moreEventsData)
          break
        case EVENT_SOURCES.ARTIST:
          state.artistDetailsData = _setMoreEventsBase(state.artistDetailsData, moreEventsData)
          break
        case EVENT_SOURCES.PLACE:
          state.placeDetailsData = _setMoreEventsBase(state.placeDetailsData, moreEventsData)
          break
      }        
    },

    [types.SET_EVENT_LOADING](state, loading){
      state.eventsData.loading = loading;      
    },
    [types.SET_EVENT_LOADING_MORE](state, { loading, source = EVENT_SOURCES.EVENTS }){
      switch (source){
        case EVENT_SOURCES.EVENTS:
          state.eventsData.loadingMore = loading
          break
        case EVENT_SOURCES.ARTIST:
          state.artistDetailsData.loadingMore = loading
          break
        case EVENT_SOURCES.PLACE:
          state.placeDetailsData.loadingMore = loading
          break
      }
    },
    [types.SET_EVENT_DETAILS](state, event){
      state.eventDetailsData.event = event;
    },
    [types.SET_ARTIST_DETAILS](state, artist){
      state.artistDetailsData.artist = artist;
      if (artist){
        state.artistDetailsData.events = artist.Events
        state.artistDetailsData.lastPage = artist.LastEventsPage
        state.artistDetailsData.page = 0
      }
    },
    [types.SET_PLACE_DETAILS](state, place){
      state.placeDetailsData.place = place;
      if (place){
        state.placeDetailsData.events = place.Events
        state.placeDetailsData.lastPage = place.LastEventsPage
        state.placeDetailsData.page = 0
      }
    },
    [types.SET_FILTERS](state, newFilters){
      state.filters = newFilters
    },
    [types.SET_MENU_OPEN](state, open){
      state.menuOpen = open      
    }
  }