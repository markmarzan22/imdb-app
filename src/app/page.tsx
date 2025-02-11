'use client';

import TopNavbar from '@/components/layout/TopNavbar';
import SearchMovieResult from '@/components/search/SearchMovieResult';

export default function Home() {
    return (
        <div>
            <TopNavbar />
            <SearchMovieResult />
        </div>
    );
}
