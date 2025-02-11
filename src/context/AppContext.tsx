'use client';

import { MovieOverview } from '@/app/models/movieOverview.model';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
    movies: MovieOverview[];
    setMovies: React.Dispatch<React.SetStateAction<MovieOverview[]>>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [movies, setMovies] = useState<MovieOverview[]>([]);

    return <AppContext.Provider value={{ movies, setMovies }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
