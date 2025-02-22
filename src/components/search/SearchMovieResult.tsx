'use client';

import { useAppContext } from '@/context/AppContext';
import SearchMovieCard from './SearchMovieCard';
import { useEffect, useMemo, useRef } from 'react';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import SkeletonLoading from './SkeletonLoading';
import { Button, Progress, Typography } from '@material-tailwind/react';
import { ArrowLongDownIcon } from '@heroicons/react/24/outline';
import { MediaType } from '@/app/models/movieOverview.model';

const SearchMovieResult = () => {
    const { movies, hasMore, isLoading, query, mediaType, totalResults } = useAppContext();
    const { searchMovies } = useSearchMovies();
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const progress = useMemo(() => (movies.length / +totalResults) * 100, [movies.length, totalResults]);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    searchMovies(query, mediaType as MediaType);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [hasMore, isLoading]);

    return (
        <>
            {movies.length !== 0 ? (
                <>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                        Search Results: {movies.length} of {totalResults} records
                    </Typography>
                    <Progress value={progress} />
                </>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mb-8">
                {movies.map((movie) => (
                    <SearchMovieCard key={movie.imdbID} movie={movie} />
                ))}
                {isLoading && Array.from({ length: 5 }).map((el, index) => <SkeletonLoading key={index} />)}
            </div>
            {hasMore && (
                <div className="text-center mt-5 mb-5" ref={loadMoreRef}>
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
