import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    metaAddress: sessionStorage.getItem('metaAddressRewardHistory') || '',
    accessToken: sessionStorage.getItem('access_token_swanRewardHistory') || '',
    accessKey: sessionStorage.getItem('access_apikey_swanRewardHistory') || '',
    signature: sessionStorage.getItem('signature_swanRewardHistory') || '',
  },
  mutations: {
    SET_METAADDRESS: (state, metaAddress) => {
      state.metaAddress = metaAddress
      sessionStorage.setItem('metaAddressRewardHistory', metaAddress)
    },
    SET_ACCESSTOKEN: (state, accessToken) => {
      state.accessToken = accessToken
      sessionStorage.setItem('access_token_swanRewardHistory', accessToken)
    },
    SET_ACCESSAPIKEY: (state, accessKey) => {
      state.accessKey = accessKey
      sessionStorage.setItem('access_apikey_swanRewardHistory', accessKey)
    },
    SET_SIGNATURE: (state, signature) => {
      state.signature = signature
      sessionStorage.setItem('signature_swanRewardHistory', signature)
    }
  },
  actions: {
    setMetaAddress({
      commit
    }, metaAddress) {
      commit('SET_METAADDRESS', metaAddress)
    },
    setAccessToken({
      commit
    }, accessToken) {
      commit('SET_ACCESSTOKEN', accessToken)
    },
    setAccessApiKey({
      commit
    }, accessKey) {
      commit('SET_ACCESSAPIKEY', accessKey)
    },
    setSignature({
      commit
    }, signature) {
      commit('SET_SIGNATURE', signature)
    }
  },
  modules: {}
})