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

export interface MovieSearchResponse extends MovieResponseStatus {
    Search: MovieOverview[];
    totalResults: string;
}

export interface MovieResponseStatus {
    Response: 'True' | 'False';
    Error?: string;
}
