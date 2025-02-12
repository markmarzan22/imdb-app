'use client';

import { useAppContext } from '@/context/AppContext';
import SearchMovieCard from './SearchMovieCard';
import { useEffect } from 'react';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import SkeletonLoading from './SkeletonLoading';
import { Button } from '@material-tailwind/react';
import { ArrowLongDownIcon } from '@heroicons/react/24/outline';

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
        <>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {movies.map((movie) => (
                    <SearchMovieCard key={movie.imdbID} movie={movie} />
                ))}
                {isLoading && Array.from({ length: 5 }).map((el, index) => <SkeletonLoading key={index} />)}
            </div>
            {hasMore && (
                <div className="max-w-screen-xl mx-auto text-center mt-5 mb-5">
                    <Button variant="text">
                        Scroll down to load more popular matches
                        <ArrowLongDownIcon className="h-5 mx-auto my-6" />
                    </Button>
                </div>
            )}
        </>
    );
};

export default SearchMovieResult;
