import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ThemeProviderWrapper } from './ThemeProviderWrapper';

export const metadata: Metadata = {
    title: 'IMDB App',
    description: 'A movie search app using Next.js, TypeScript, and Material Tailwind'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeProviderWrapper>
                    <AppProvider>{children}</AppProvider>
                </ThemeProviderWrapper>
            </body>
        </html>
    );
}
