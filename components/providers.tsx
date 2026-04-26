'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'viem/chains';
import { type ReactNode, useEffect, useState } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { sdk } from '@farcaster/miniapp-sdk';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'Base Node Explorer',
      preference: 'smartWalletOnly',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
      } catch (error) {
        console.error('Farcaster SDK failed to initialize:', error);
      } finally {
        setIsSdkReady(true);
        setMounted(true);
      }
    };

    init();
  }, []);

  if (!mounted || !isSdkReady) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin mb-4" />
          <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">System Booting...</p>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
