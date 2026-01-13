import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tredje Boligsektor - Aktørkartlegging',
  description:
    'Kartlegging av aktører innen tredje boligsektor i Norge. Data konsolidert fra 5 AI-rapporter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
