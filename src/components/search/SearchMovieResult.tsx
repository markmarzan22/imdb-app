'use client';

import { useAppContext } from '@/context/AppContext';
import SearchMovieCard from './SearchMovieCard';
import { useEffect } from 'react';
import { useSearchMovies } from '@/hooks/useSearchMovies';

const SearchMovieResult = () => {
    const { movies, hasMore, isLoading, query } = useAppContext();
    const { searchMovies } = useSearchMovies();

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (hasMore && !isLoading) {
            searchMovies(query);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoading]);

    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {movies.map((movie) => (
                <SearchMovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default SearchMovieResult;
