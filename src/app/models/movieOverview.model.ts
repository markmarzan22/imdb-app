export interface MovieOverview {
    Title: string;
    Year: string;
    imdbID: string;
    Type: MediaType;
    Poster: string;
}

export enum MediaType {
    movie = 'movie',
    series = 'series',
    episode = 'episode'
}

export interface MovieSearchResponse {
    Search: MovieOverview[];
    totalResults: string;
    Response: 'True' | 'False';
}
