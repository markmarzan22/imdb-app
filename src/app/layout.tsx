import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
    title: 'IMDB App',
    description: 'A movie search app using Next.js, TypeScript, and Material Tailwind'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
