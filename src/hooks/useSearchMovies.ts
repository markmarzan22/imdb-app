import { useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';
import debounce from 'lodash.debounce';
import { MovieSearchResponse } from '@/app/models/movieOverview.model';

export const useSearchMovies = () => {
    const { setMovies, query, setQuery, currentPage, setCurrentPage, isLoading, setIsLoading, hasMore, setHasMore } =
        useAppContext();

    const searchMovies = useCallback(
        debounce(async (newQuery: string) => {
            if (!newQuery.trim() || isLoading) return;

            const isNewSearch = newQuery !== query;

            if (isNewSearch) {
                // Reset everything if it's a new search
                setMovies([]);
                setCurrentPage(1);
                setHasMore(true);
            }

            setIsLoading(true);
            try {
                const { data } = await axios.get<MovieSearchResponse>('/api/movies', {
                    params: { query: newQuery, page: isNewSearch ? 1 : currentPage }
                });

                setMovies((prevMovies) => {
                    const newMovies = isNewSearch ? data.Search || [] : [...prevMovies, ...(data.Search || [])];
                    setHasMore(newMovies.length < +data.totalResults);
                    return newMovies;
                });
                setCurrentPage((prevPage) => prevPage + 1);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        }, 1000),
        [currentPage, isLoading, setMovies, setQuery, setCurrentPage, setHasMore, setIsLoading]
    );

    return { searchMovies, isLoading, hasMore };
};
