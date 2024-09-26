import { mainnet, sepolia } from 'viem/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/vue'

// 1. Define constants
const projectId = '96edc188f4c9ba78898f2145f6210614'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = process.env.VUE_APP_CHAINID === '1' ? [mainnet] : [sepolia]
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
})

export default {
  projectId,
  config
}