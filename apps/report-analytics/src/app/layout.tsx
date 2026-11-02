import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skyline Airlines — Report Analytics',
  description: 'SSR analytics module (Next.js remote) for the Skyline MRO platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
