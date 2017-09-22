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
      hightlights: []  //list of hight light events
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
      }
    },
    mutations: {
      changeMobile (state, isMobile) {
        state.isMobile = isMobile
      },
      setHightlights(state, hightlights){
        state.hightlights = hightlights
      }
    }
  })
  return store;
}

export default createStore