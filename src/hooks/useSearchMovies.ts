import { useCallback } from 'react';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';
import debounce from 'lodash.debounce';
import { MediaType, MovieSearchResponse } from '@/app/models/movieOverview.model';

export const useSearchMovies = () => {
    const {
        setMovies,
        query,
        setQuery,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,
        hasMore,
        setHasMore,
        mediaType,
        setTotalResults,
        setResponseMessage
    } = useAppContext();

    const resetMovies = () => {
        setMovies([]);
        setCurrentPage(1);
        setHasMore(false);
    };

    const searchMovies = useCallback(
        debounce(async (newQuery: string, newMediaType?: MediaType) => {
            if (!newQuery.trim()) {
                resetMovies();
                return;
            }

            const isNewSearch = newQuery !== query || newMediaType !== mediaType;

            if (isNewSearch) resetMovies();

            setIsLoading(true);
            try {
                const { data } = await axios.get<MovieSearchResponse>('/api/movies/search', {
                    params: { query: newQuery, page: isNewSearch ? 1 : currentPage, type: newMediaType }
                });

                setMovies((prevMovies) => {
                    const newMovies = isNewSearch ? data.Search || [] : [...prevMovies, ...(data.Search || [])];
                    setHasMore(newMovies.length < +data.totalResults);
                    return newMovies;
                });
                setTotalResults(data.totalResults);
                setResponseMessage({ Response: data.Response, Error: data?.Error });
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
