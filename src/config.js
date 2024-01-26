import { http, createConfig } from 'wagmi'
import { mainnet, goerli, zkFair } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

export const projectId = process.env.REACT_APP_PROJECT_ID
  
export const metadata = {
  name: 'ZKFair Domains',
  description: ''
}

export const chains = [mainnet, goerli, zkFair];

export const wagmiConfig = createConfig({
    chains: chains,
    transports: { 
      [mainnet.id]: http(),
      [goerli.id]: http("https://goerli.infura.io/v3/"+ process.env.REACT_APP_INFURA_KEY),
      [zkFair.id]: http(),
    },
    connectors: [
      walletConnect({ projectId, metadata, showQrModal: true }),
      injected({ shimDisconnect: true }),
      coinbaseWallet({
        appName: metadata.name
      })
    ]
});