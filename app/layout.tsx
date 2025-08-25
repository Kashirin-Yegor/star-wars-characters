import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/shared/styles/globals.css';
import { Toaster } from '@/shared/ui/Toaster';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Star Wars Characters',
  description: 'Приложение для просмотра персонажей из вселенной Star Wars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen bg-background dark">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
