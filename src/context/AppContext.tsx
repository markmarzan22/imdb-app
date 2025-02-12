'use client';

import { MovieOverview, MovieResponseStatus } from '@/app/models/movieOverview.model';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
    movies: MovieOverview[];
    setMovies: React.Dispatch<React.SetStateAction<MovieOverview[]>>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    mediaType: string;
    setMediaType: React.Dispatch<React.SetStateAction<string>>;
    totalResults: string;
    setTotalResults: React.Dispatch<React.SetStateAction<string>>;
    responseMessage: MovieResponseStatus | null;
    setResponseMessage: React.Dispatch<React.SetStateAction<MovieResponseStatus | null>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [movies, setMovies] = useState<MovieOverview[]>([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [mediaType, setMediaType] = useState('');
    const [totalResults, setTotalResults] = useState('');
    const [responseMessage, setResponseMessage] = useState<MovieResponseStatus | null>(null);

    return (
        <AppContext.Provider
            value={{
                movies,
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
                setMediaType,
                totalResults,
                setTotalResults,
                responseMessage,
                setResponseMessage
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
