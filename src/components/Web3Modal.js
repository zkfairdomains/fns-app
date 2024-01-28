import { WagmiProvider } from 'wagmi'
import { wagmiConfig, chains, projectId } from "../config";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 
const queryClient = new QueryClient()
 
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}