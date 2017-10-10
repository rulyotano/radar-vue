import Vuex from 'vuex'

import mutations from '~/store/mutations'
import actions from '~/store/actions'

const createStore = () => {
  let store = new Vuex.Store({
    state: {
      isMobile: false,
      hightlights: [],  //list of hight light events
      menuOpen: false,
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
    actions,
    mutations
  })
  return store;
}

export default createStore