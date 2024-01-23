import { createWeb3Modal } from '@web3modal/wagmi/react'

import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 
const queryClient = new QueryClient()
 
const projectId = process.env.REACT_APP_PROJECT_ID
  
const metadata = {
  name: 'ZKFair Domains',
  description: ''
}

const chains = [mainnet, goerli]

const wagmiConfig = createConfig({
  chains: chains,
  transports: {
    [mainnet.id]: http(),
    [goerli.id]: http()
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: true }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name
    })
  ]
})

 
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}