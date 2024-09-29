import { Buffer } from "buffer"
import { metaAddress } from "./storage"

let web3Init: any
let web3: any
let providerInit = (window as any)?.ethereum?.providers
if (providerInit) providerInit = providerInit.find((provider: any) => provider.isMetaMask) 
else providerInit = (window as any)?.ethereum

if (typeof (window as any)?.ethereum === 'undefined') {
  // window.open('https://metamask.io/download.html')
  // alert("Consider installing MetaMask!");
} else {
  if ((window as any)?.ethereum) {
    web3 = new Web3(providerInit);
    web3.setProvider(providerInit);
  } else if ((window as any)?.web3) {
    web3 = (window as any).web3;
    console.log("Injected web3 detected.");
  } else {
    const currentProvider = web3.currentProvider;
    web3 = new Web3(currentProvider);
    web3.setProvider(currentProvider);
    console.log("No web3 instance injected, using Local web3.");
  }
  web3Init = web3
}

export default web3Init

export async function Init(callback: any) {
  if (typeof (window as any)?.ethereum === 'undefined') {
    window.open('https://metamask.io/download.html')
    alert("Consider installing MetaMask!");
  } else {
    providerInit
      .request({
        method: 'eth_requestAccounts'
      })
      .then((accounts: any) => {
        if (!accounts) {
          return false
        }
        web3Init.eth.getAccounts().then(async (webAccounts: any) => {
          // console.log('webAccounts:',webAccounts)
          callback(webAccounts[0])
        })
          .catch(async () => {
            callback(accounts[0])
          })
      })
      .catch((error: any) => {
        if (error !== "User rejected provider access") {
          alert("Please unlock MetaMask and switch to the correct network.");
          return false
        }
        console.error(
          `Error fetching accounts: ${error.message}.
        Code: ${error.code}. Data: ${error.data}`
        );
      });
  }
}

export async function sign() {
  const rightnow = Number((Date.now() / 1000).toFixed(0))
  const sortanow = rightnow - (rightnow % 600)
  const local = import.meta.env.VITE_DOMAIM_NAME
  const buff = Buffer.from("Signing in to " + local + " at " + sortanow, 'utf-8')
  let signature = null
  let signErr = ''
  await providerInit.request({
    method: 'personal_sign',
    params: [buff.toString('hex'), metaAddress.value]
  }).then((sig:any) => {
    signErr = ''
    signature = sig
  }).catch(async (err:any) => {
    console.log(err)
    signature = ''
    signErr = err?.message || 'error'
  })
  return [signature, signErr]
}

let lastTime = 0
export async function throttle () {
  // Prevent multiple signatures
  const now = new Date().valueOf()
  if (lastTime > 0 && now - lastTime <= 2000) return false
  lastTime = now
  return true
}


