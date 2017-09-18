import * as isMobile from 'ismobilejs'

const checkIfMobile = (context) => {
  debugger;
  const userAgent = context.isServer ? context.req.headers['user-agent'] : navigator.userAgent
  return isMobile(userAgent).any
}

export const state = () => ({
  isMobile: false
})

export const getters = () => ({
  isMobile: state => state.isMobile
})

export const actions = () => ({
  nuxtServerInit ({commit}, context) {
    commit('changeMobile', checkIfMobile(context))
  }
})

export const mutations = () => ({
  changeMobile (state, isMobile) {
    state.isMobile = isMobile
  }
})