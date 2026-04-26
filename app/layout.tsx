import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import '@coinbase/onchainkit/styles.css';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_URL || 'https://ais-dev-g22pitxndjikod57fnrmuc-615601803900.asia-southeast1.run.app';
  
  return {
    title: 'Base Node Explorer',
    description: 'Technical dashboard for the Base network',
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: `https://picsum.photos/seed/basehero/1200/630`,
        button: {
          title: `Launch Node Explorer`,
          action: {
            type: 'launch_miniapp',
            name: 'Base Node Explorer',
            url: appUrl,
            splashImageUrl: `https://picsum.photos/seed/basesplash/1200/800`,
            splashBackgroundColor: '#0a0a0a',
          },
        },
      }),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body suppressHydrationWarning className="bg-[#0a0a0a] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
