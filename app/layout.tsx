import type { Metadata } from 'next';
import { Sora, Manrope } from 'next/font/google';
import './globals.css';
import { WorkspaceWrapper } from '@/components/WorkspaceWrapper';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Teranga Resto',
  description: 'Commandez en toute simplicité',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sora.variable} ${manrope.variable}`}>
      <body className="antialiased font-body bg-[#FFF8ED] text-foreground min-h-screen relative" suppressHydrationWarning>
        <WorkspaceWrapper>
          {children}
        </WorkspaceWrapper>
      </body>
    </html>
  );
}
