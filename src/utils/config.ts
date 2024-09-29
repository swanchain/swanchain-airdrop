import { mainnet, sepolia, arbitrum } from 'viem/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { currentNetwork } from './storage'

const SWAN_MAINNET = {
    id: Number(254),
    name: 'Swan Mainnet',
    network: 'SWAN',
    iconUrl: 'https://i.imgur.com/Q3oIdip.png',
    iconBackground: '#000000',
    nativeCurrency: {
        decimals: 18,
        name: 'Swan ETH',
        symbol: 'sETH',
    },
    rpcUrls: {
        default: {
            http: [String('https://mainnet-internal.swanchain.io')],
        },
    },
    blockExplorers: {
        default: {
            name: 'Swan Mainnet Explorer',
            url: 'https://mainnet-explorer.swanchain.io/' || '', // process.env.NEXT_PUBLIC_L2_PROXIMA_EXPLORER_URL || '',
        },
    },
    testnet: false
}
const SWAN_PROXIMA = {
  id: Number(20241133), //Number(process.env.NEXT_PUBLIC_L2_PROXIMA_CHAIN_ID),
  name: 'Proxima',
  network: 'SWAN',
  iconUrl: 'https://i.imgur.com/Q3oIdip.png',
  iconBackground: '#000000',
  nativeCurrency: {
    decimals: 18,
    name: 'Swan ETH',
    symbol: 'sETH',
  },
  rpcUrls: {
    default: {
      http: [String('https://rpc-proxima.swanchain.io')], // [String(process.env.NEXT_PUBLIC_L2_PROXIMA_RPC_URL)],
    },
  },
  blockExplorers: {
    default: {
      name: 'Swan Testnet Explorer',
      url: 'https://proxima-explorer.swanchain.io' || '', // process.env.NEXT_PUBLIC_L2_PROXIMA_EXPLORER_URL || '',
    },
  },
  testnet: true
}
const SWAN_SATURN = {
  id: Number(2024),
  name: 'Saturn',
  network: 'SWAN',
  iconUrl: 'https://i.imgur.com/Q3oIdip.png',
  iconBackground: '#000000',
  nativeCurrency: {
    decimals: 18,
    name: 'Swan ETH',
    symbol: 'swanETH',
  },
  rpcUrls: {
    default: {
      http: [String('https://saturn-rpc.swanchain.io')],
    },
  },
  blockExplorers: {
    default: {
      name: 'Swan Testnet Explorer',
      url: 'https://saturn-explorer.swanchain.io',
    },
  },
  testnet: true
}

// 1. Define constants
const projectId = '96edc188f4c9ba78898f2145f6210614'

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// const chains: any = [SWAN_MAINNET] //mainnet, arbitrum
// const chains: any = currentNetwork.value === 'Proxima' ? [SWAN_PROXIMA] : [SWAN_MAINNET]
// const chains: any = [SWAN_MAINNET, mainnet, sepolia, SWAN_PROXIMA, SWAN_SATURN]
const chains: any = [SWAN_MAINNET, SWAN_PROXIMA]
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