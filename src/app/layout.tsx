import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import TopNavbar from '@/components/layout/TopNavbar';
import SearchMovieResult from '@/components/search/SearchMovieResult';

export const metadata: Metadata = {
    title: 'IMDB App',
    description: 'A movie search app using Next.js, TypeScript, and Material Tailwind'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <TopNavbar />
                    <div className="max-w-screen-xl mx-auto ">
                        {children}
                        <SearchMovieResult />
                    </div>
                </AppProvider>
            </body>
        </html>
    );
}
