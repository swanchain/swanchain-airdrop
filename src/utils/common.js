import store from '../store'
import axios from 'axios'
import {
  ElMessage
} from 'element-plus'
import { getAccount, signMessage, disconnect } from '@wagmi/core'
import config from './config.js'

async function sendRequest(apilink, type, jsonObject, api_token) {
  // axios.defaults.timeout = 60000
  axios.defaults.headers.common['Authorization'] = `Bearer ${api_token ? api_token : store.state.accessToken}`
  try {
    let response
    switch (type) {
      case 'post':
        response = await axios.post(apilink, jsonObject)
        return response.data
      case 'put':
        response = await axios.put(apilink, jsonObject)
        return response.data
      case 'get':
        response = await axios.get(apilink)
        return response.data
      case 'delete':
        response = await axios.delete(apilink, {
          data: jsonObject
        })
        return response.data
    }
  } catch (err) {
    console.error(err, err.response)
    messageTip('error', err.response ? err.response.statusText : 'Request failed. Please try again later!')
    if (err.response) {
      // The request has been sent, but the status code of the server response is not within the range of 2xx
      // console.log(err.response.data)
      // console.log(err.response.status)
      // console.log(err.response.headers)
      return err.response.data
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', err.message)
      return err
    }
  }
}

async function timeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

async function messageTip(type, text) {
  ElMessage({
    showClose: true,
    message: text,
    type: type,
  })
}

function copyContent(text, tipCont) {
  var txtArea = document.createElement('textarea')
  txtArea.id = 'txt'
  txtArea.style.position = 'fixed'
  txtArea.style.top = '0'
  txtArea.style.left = '0'
  txtArea.style.opacity = '0'
  txtArea.value = text
  document.body.appendChild(txtArea)
  txtArea.select()

  try {
    var successful = document.execCommand('copy')
    var msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copying text command was ' + msg)
    if (successful) {
      messageTip('success', tipCont)
      return true
    }
  } catch (err) {
    console.log('Oops, unable to copy')
  } finally {
    document.body.removeChild(txtArea)
  }
  return false
}

function goLink(link) {
  if (!link) return
  window.open(link)
}


async function Init(callback) {
  if (typeof window.ethereum === 'undefined') {
    goLink('https://metamask.io/download.html')
    alert("Consider installing MetaMask!");
  } else {
    const account = getAccount(config.config)
    callback(account?.address)
  }
}

async function login(config) {
  if (!store.state.metaAddress || store.state.metaAddress === undefined) {
    const account = getAccount(config.config)
    store.dispatch('setMetaAddress', account?.address)
  }
  const time = await throttle()
  console.log('passed metamask wait')
  if (!time) return [false, '']
  console.log('before sign')
  const [signature, signErr] = await sign(config)
  if (signature) store.dispatch('setSignature', signature)
  console.log('after sign', signature)
  console.log(store.state.signature)
  if (!signature) return [false, signErr]
  const token = await performSignin(signature)
  return [!!token, '']
}

let lastTime = 0
async function throttle() {
  // Prevent multiple signatures
  let now = new Date().valueOf();
  if (lastTime > 0 && (now - lastTime) <= 2000) return false
  lastTime = now
  return true
}

async function sign() {
  const rightnow = (Date.now() / 1000).toFixed(0)
  const sortanow = rightnow - (rightnow % 600)
  const local = process.env.VUE_APP_DOMAINNAME_MAINNET
  const buff = Buffer.from("Signing in to " + local + " at " + sortanow, 'utf-8')
  let signature = null
  const signErr = ''
  try {
    // const signatureMessage = await signMessage(config.config, { message: buff.toString('hex') })
    signature = await signMessage(config.config, { message: "Signing in to " + local + " at " + sortanow })
    return [signature, signErr]
  } catch {
    return [signature, 'error']
  }
}

async function performSignin(sig) {
  try {
    const reqOpts = [store.state.metaAddress, sig]
    const response = await sendRequest(`${process.env.VUE_APP_BASELOGINAPI}login`, 'post', reqOpts)
    if (response && response.access_token) {
      store.dispatch('setAccessApiKey', response.api_token || '')
      store.dispatch('setAccessToken', response.access_token)
      return true
    } else signOutFun()
    messageTip('error', response ? response.message : 'Fail')
    return null
  } catch (err) {
    console.log('login err:', err)
    messageTip('error', 'Fail')
    signOutFun()
    return null
  }
}

async function signOutFun(status) {
  if (store.state.accessToken || status) {
    const account = getAccount(config.config)
    if (account?.address) await disconnect(config.config)
    store.dispatch('setMetaAddress', '')
  }
  store.dispatch('setAccessToken', '')
  store.dispatch('setSignature', '')
}

let web3Init
const providerInit = window.ethereum && window.ethereum.providers ? window.ethereum.providers.find((provider) => provider.isMetaMask) : window.ethereum
if (typeof window.ethereum === 'undefined') {
  window.open('https://metamask.io/download.html')
  alert("Consider installing MetaMask!");
} else {
  if (window.ethereum) {
    web3 = new Web3(providerInit);
    web3.setProvider(providerInit);
  } else if (window.web3) {
    web3 = window.web3;
    console.log("Injected web3 detected.");
  } else {
    var currentProvider = web3.currentProvider;
    web3 = new Web3(currentProvider);
    web3.setProvider(currentProvider);
    console.log("No web3 instance injected, using Local web3.");
  }
  web3Init = web3
}

function hiddAddress(val) {
  if (val) return `${val.substring(0, 5)}...${val.substring(val.length - 5)}`
  else return '-'
}

function momentFun(dateItem) {
  if (!dateItem) return null
  const t = /^\d{10}$|^\d{13}$/.test(dateItem)
  let dateNew = t ? dateItem.toString().length === 13 ? dateItem : dateItem * 1000 : new Date(dateItem).getTime()
  let dataUnit = ''
  let dataTime = new Date(dateNew) + ''
  let dataUnitIndex = dataTime.indexOf('GMT')
  let dataUnitArray = dataTime.substring(dataUnitIndex, dataUnitIndex + 8)
  switch (dataUnitArray) {
    case 'GMT+1000':
      dataUnit = 'UTC+10'
      break
    case 'GMT-1000':
      dataUnit = 'UTC-10'
      break
    case 'GMT+0000':
      dataUnit = 'UTC+0'
      break
    default:
      dataUnit = dataUnitArray ? dataUnitArray.replace(/0/g, '').replace('GMT', 'UTC') : '-'
      break
  }
  dateNew = dateNew ?
    moment(new Date(parseInt(dateNew))).format('YYYY-MM-DD HH:mm:ss') + ` (${dataUnit})` :
    '-'
  return dateNew
}

export default {
  sendRequest,
  timeout,
  messageTip,
  copyContent,
  goLink,
  Init,
  web3Init,
  hiddAddress,
  providerInit,
  momentFun,
  login,
  signOutFun
}