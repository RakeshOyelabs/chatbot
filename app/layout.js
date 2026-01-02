import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../contexts/ThemeContext.js';
import { LanguageProvider } from '../contexts/LanguageContext.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StrikingDash - Admin Dashboard',
  description: 'Modern admin dashboard with multi-language and theme support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}