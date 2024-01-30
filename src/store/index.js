import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    metaAddress: sessionStorage.getItem('metaAddressRewardHistory') || ''
  },
  mutations: {
    SET_METAADDRESS: (state, metaAddress) => {
      state.metaAddress = metaAddress
      sessionStorage.setItem('metaAddressRewardHistory', metaAddress)
    }
  },
  actions: {
    setMetaAddress({
      commit
    }, metaAddress) {
      commit('SET_METAADDRESS', metaAddress)
    }
  },
  modules: {}
})